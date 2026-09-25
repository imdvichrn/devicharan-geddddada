import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { WindowChrome } from './WindowChrome';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { SVGLoadingSpinner, SVGSuccessCheckmark, SVGErrorCross } from '@/components/motion/MicroFeedback';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Hidden field for spam protection
}

interface ContactFormProps {
  showChrome?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: ''
};

// EmailJS Credentials & Template IDs
const SERVICE_ID = 'service_20azq4s';
const PUBLIC_KEY = 'yxDgR_bWBnh9BXZpr';
const NOTIFY_TEMPLATE = 'template_689lfji';
const AUTOREPLY_TEMPLATE = 'template_w46ui3m';

export function ContactForm({ showChrome = true, className = '', title = 'Get In Touch', subtitle }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Check honeypot for spam
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('loading');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        time: new Date().toLocaleString(),
      };

      const templateParams = {
        from_name: payload.name,
        from_email: payload.email,
        user_name: payload.name,
        user_email: payload.email,
        name: payload.name,
        email: payload.email,
        reply_to: payload.email,
        to_email: payload.email,
        to_name: payload.name,
        subject: payload.subject,
        message: payload.message,
        time: payload.time,
      };

      let emailJsDelivered = false;
      let serverDelivered = false;

      // 1. Try sending via EmailJS if available
      try {
        await emailjs.send(SERVICE_ID, NOTIFY_TEMPLATE, templateParams, PUBLIC_KEY);
        emailJsDelivered = true;
        
        // Attempt visitor autoreply quietly (non-blocking failure)
        try {
          await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE, templateParams, PUBLIC_KEY);
        } catch (autoReplyErr) {
          console.warn('Autoreply notice:', autoReplyErr);
        }
      } catch (emailJsError: any) {
        console.warn('EmailJS service notice (falling back to direct backend channel):', emailJsError?.text || emailJsError?.message || emailJsError);
      }

      // 2. Submit to reliable backend /api/contact endpoint
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          serverDelivered = true;
        }
      } catch (serverError) {
        console.warn('Backend contact route notice:', serverError);
      }

      // If either server or EmailJS received the message, mark as successful
      if (emailJsDelivered || serverDelivered) {
        setSubmitStatus('success');
        toast({
          title: "Message sent.",
          description: "Thanks — I'll get back to you when I can.",
        });

        // Reset form on confirmed success
        setFormData(initialFormData);
        setErrors({});

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 4000);
      } else {
        throw new Error('Unable to deliver message at this time.');
      }
    } catch (error) {
      console.error('Contact form submission fallback triggered:', error);
      setSubmitStatus('error');
      toast({
        title: "Message not delivered",
        description: "Please email directly at devicharangeddada@gmail.com",
        variant: "destructive",
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-6 sm:p-8 md:p-10 lg:p-11 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-[0_6px_28px_-4px_rgba(0,0,0,0.25)] transition-all duration-300 ${className}`}>
      {showChrome && (
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <WindowChrome />
          <span className="text-[11px] sm:text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Direct Transmission
          </span>
        </div>
      )}
      
      <div className="mb-6 sm:mb-8 space-y-1 text-left">
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-foreground">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Fill out the fields below or reach out directly on WhatsApp or Email.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          className="absolute -left-[9999px] opacity-0 pointer-events-none"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2 text-left">
            <Label htmlFor="contact-name" className="text-xs sm:text-sm font-mono uppercase tracking-wider text-foreground/80 font-medium">
              Name *
            </Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              className={`h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm md:text-base rounded-xl bg-background/60 border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all ${errors.name ? 'border-destructive' : ''}`}
              required
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-xs text-destructive pt-0.5">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-left">
            <Label htmlFor="contact-email" className="text-xs sm:text-sm font-mono uppercase tracking-wider text-foreground/80 font-medium">
              Email *
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm md:text-base rounded-xl bg-background/60 border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all ${errors.email ? 'border-destructive' : ''}`}
              required
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-destructive pt-0.5">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2 text-left">
          <Label htmlFor="contact-subject" className="text-xs sm:text-sm font-mono uppercase tracking-wider text-foreground/80 font-medium">
            Subject *
          </Label>
          <Input
            id="contact-subject"
            name="subject"
            placeholder="Project inquiry, video post-production, or consultation"
            value={formData.subject}
            onChange={handleInputChange}
            className={`h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm md:text-base rounded-xl bg-background/60 border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all ${errors.subject ? 'border-destructive' : ''}`}
            required
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="text-xs text-destructive pt-0.5">{errors.subject}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2 text-left">
          <Label htmlFor="contact-message" className="text-xs sm:text-sm font-mono uppercase tracking-wider text-foreground/80 font-medium">
            Message *
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Describe your project, timeline, deliverables, or objectives..."
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`min-h-[130px] sm:min-h-[150px] md:min-h-[170px] p-3.5 sm:p-4 text-xs sm:text-sm md:text-base rounded-xl bg-background/60 border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/40 resize-y leading-relaxed transition-all ${errors.message ? 'border-destructive' : ''}`}
            required
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-xs text-destructive pt-0.5">{errors.message}</p>
          )}
        </div>

        <div className="pt-2 sm:pt-3">
          <Button
            type="submit"
            className={`w-full h-11 sm:h-12 md:h-13 rounded-xl text-xs sm:text-sm md:text-base font-medium transition-all duration-200 depth-interactive shadow-sm ${
              submitStatus === 'success'
                ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                : submitStatus === 'error'
                ? 'bg-destructive hover:bg-destructive text-white'
                : 'bg-primary hover:bg-primary/95 text-primary-foreground'
            }`}
            disabled={isSubmitting || submitStatus === 'success'}
            aria-label="Send message to Geddada Devicharan"
          >
            {submitStatus === 'loading' && (
              <span className="inline-flex items-center justify-center gap-2">
                <SVGLoadingSpinner size={16} className="shrink-0" />
                <span>Transmitting message...</span>
              </span>
            )}
            {submitStatus === 'success' && (
              <span className="inline-flex items-center justify-center gap-2 text-white font-medium">
                <SVGSuccessCheckmark size={17} className="shrink-0 text-white" />
                <span>Message Transmitted Successfully</span>
              </span>
            )}
            {submitStatus === 'error' && (
              <span className="inline-flex items-center justify-center gap-2 text-white font-medium">
                <SVGErrorCross size={17} className="shrink-0 text-white" />
                <span>Failed — Please Try Again</span>
              </span>
            )}
            {submitStatus === 'idle' && (
              <span className="inline-flex items-center justify-center gap-2">
                <Send className="h-4 w-4 shrink-0" />
                <span>Send Direct Message</span>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
