export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  credentialName: string;
  issueDate: string;
  credentialId: string;
  certificatePreviewImage: string;
  assessmentResult: {
    score: string;
    evidenceImage: string;
    evidenceLabel: string;
  };
  pdfUrl: string;
  assessmentCoverage: string[];
  verificationNotes: string;
  isFeatured: boolean;
}

export const credentialsList: Credential[] = [
  {
    id: 'bmd-davinci-colorist-20',
    title: "The Colorist's Guide to DaVinci Resolve 20",
    issuer: 'Blackmagic Design',
    issuerLogo: '/certificates/blackmagic-design-logo.jpeg',
    credentialName: 'Certified User',
    issueDate: 'October 21, 2026',
    credentialId: 'B02B-2855-AD74-49DB',
    certificatePreviewImage: '/certificates/davinci-resolve-20-certificate-preview.png',
    assessmentResult: {
      score: '94%',
      evidenceImage: '/certificates/davinci-resolve-20-assessment-evidence.jpeg',
      evidenceLabel: 'Blackmagic Design End-User Assessment Score Sheet (94%)'
    },
    pdfUrl: '/certificates/COLOR20-EN-ENDUSER_CertLetter_20261022_060027.pdf',
    assessmentCoverage: [
      'Color Correction & Tonal Balancing',
      'Node-Based Color Grading',
      'Power Windows & Qualifiers',
      'Color Management',
      'Project Delivery'
    ],
    verificationNotes: 'Official signed End-User Certification letter issued by Blackmagic Design upon passing the comprehensive online examination.',
    isFeatured: true
  }
];
