import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export function ContactForm() {
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
        // If EmailJS has 412 (Gmail grant expired) or network issue, log notice and rely on backend API
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
        // Both failed (e.g. complete offline state)
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
    <Card className="glass-panel border-glass-border transition-all duration-300">
      <CardHeader className="px-4 md:px-6">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <WindowChrome />
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold text-center">Get In Touch</CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`bg-transparent border-glass-border ${errors.name ? 'border-destructive' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`bg-transparent border-glass-border ${errors.email ? 'border-destructive' : ''}`}
                required
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`bg-transparent border-glass-border ${errors.subject ? 'border-destructive' : ''}`}
              required
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className={`bg-transparent border-glass-border resize-none ${errors.message ? 'border-destructive' : ''}`}
              required
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className={`w-full h-11 transition-all duration-200 ${
                submitStatus === 'success'
                  ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                  : submitStatus === 'error'
                  ? 'bg-destructive hover:bg-destructive text-white'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
              disabled={isSubmitting || submitStatus === 'success'}
              aria-label="Send message to Geddada Devicharan"
            >
              {submitStatus === 'loading' && (
                <span className="inline-flex items-center justify-center gap-2">
                  <SVGLoadingSpinner size={15} className="shrink-0" />
                  <span>Sending message...</span>
                </span>
              )}
              {submitStatus === 'success' && (
                <span className="inline-flex items-center justify-center gap-2 text-white font-medium">
                  <SVGSuccessCheckmark size={16} className="shrink-0 text-white" />
                  <span>Message Sent Successfully</span>
                </span>
              )}
              {submitStatus === 'error' && (
                <span className="inline-flex items-center justify-center gap-2 text-white font-medium">
                  <SVGErrorCross size={16} className="shrink-0 text-white" />
                  <span>Failed — Please Try Again</span>
                </span>
              )}
              {submitStatus === 'idle' && (
                <span className="inline-flex items-center justify-center gap-2">
                  <Send className="h-4 w-4 shrink-0" />
                  <span>Send Message</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}