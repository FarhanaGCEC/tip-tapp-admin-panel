interface SMTPConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
}

export interface EmailData {
    smtpConfig: SMTPConfig;
    to: string;
    subject: string;
    text: string;
}
