import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Elysium',
  description: 'Privacy Policy for Elysium API App Store',
}

export default function PrivacyPage() {
  return (
    <div className="container py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">
          Last updated: March 3, 2026
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Elysium (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the API App Store platform 
              at hub.ely.karlharrenga.com (the &quot;Service&quot;). This Privacy Policy explains 
              how we collect, use, disclose, and protect your information when you 
              use our Service.
            </p>
            <p>
              By using the Service, you consent to the data practices described in 
              this policy. If you do not agree, please do not use the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>2.1 Account Information</h4>
            <p>When you register for an account, we collect:</p>
            <ul>
              <li><strong>Email address</strong> - Used for authentication and notifications</li>
              <li><strong>Username</strong> - Public display name for your profile</li>
              <li><strong>Password</strong> - Stored securely using cryptographic hashing</li>
              <li><strong>GitHub profile data</strong> - If you authenticate via GitHub OAuth, we may collect your GitHub username and public profile information</li>
            </ul>
            <h4>2.2 Emblem and Content Data</h4>
            <p>When you publish emblems or other content, we store:</p>
            <ul>
              <li>Emblem YAML definitions and versions</li>
              <li>Metadata such as descriptions, tags, and categories</li>
              <li>Publication timestamps and update history</li>
            </ul>
            <h4>2.3 API Usage Data</h4>
            <p>We automatically collect:</p>
            <ul>
              <li>API request logs (endpoints accessed, timestamps)</li>
              <li>Authentication events</li>
              <li>Error logs for debugging purposes</li>
              <li>Download and usage statistics for emblems</li>
            </ul>
            <h4>2.4 Technical Data</h4>
            <p>When you access the Service, we may collect:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Referring URL</li>
              <li>Pages visited and interaction patterns</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. How We Use Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>We use collected information for:</p>
            <ul>
              <li><strong>Service Operation</strong> - Providing core functionality, authentication, and account management</li>
              <li><strong>Communication</strong> - Sending service notifications, security alerts, and responses to your inquiries</li>
              <li><strong>Improvement</strong> - Analyzing usage patterns to improve the Service and develop new features</li>
              <li><strong>Security</strong> - Detecting and preventing fraud, abuse, and security threats</li>
              <li><strong>Compliance</strong> - Meeting legal obligations and responding to lawful requests</li>
              <li><strong>Analytics</strong> - Aggregated, anonymized analysis of service usage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Storage and Security</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>4.1 Storage Location</h4>
            <p>
              Your data is stored securely using Supabase, which utilizes PostgreSQL 
              databases hosted on cloud infrastructure. Data may be stored in data 
              centers located in multiple geographic regions.
            </p>
            <h4>4.2 Security Measures</h4>
            <p>We implement industry-standard security practices including:</p>
            <ul>
              <li>Encryption of data in transit (TLS/HTTPS)</li>
              <li>Encryption of data at rest</li>
              <li>Secure password hashing using bcrypt or similar algorithms</li>
              <li>Row-level security on database tables</li>
              <li>API token authentication for programmatic access</li>
              <li>Regular security reviews and updates</li>
            </ul>
            <h4>4.3 Data Retention</h4>
            <p>
              We retain your account information while your account is active. 
              Upon account deletion:
            </p>
            <ul>
              <li>Account credentials are immediately invalidated</li>
              <li>Published emblems may be retained for service continuity</li>
              <li>API logs are retained for 90 days for security analysis</li>
              <li>Aggregated, anonymized analytics may be retained indefinitely</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>5.1 Essential Cookies</h4>
            <p>
              We use essential cookies to:
            </p>
            <ul>
              <li>Maintain your authentication session</li>
              <li>Remember your preferences</li>
              <li>Ensure secure access to the Service</li>
            </ul>
            <h4>5.2 Analytics</h4>
            <p>
              We may use analytics services to understand how users interact with 
              the Service. These services may use cookies to collect anonymized 
              usage data.
            </p>
            <h4>5.3 Third-Party Cookies</h4>
            <p>
              Third-party services integrated with the Service (such as GitHub OAuth) 
              may set their own cookies according to their respective privacy policies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>The Service integrates with the following third parties:</p>
            <h4>6.1 Supabase</h4>
            <p>
              We use Supabase for database storage, authentication, and real-time 
              features. Supabase processes data on our behalf and is bound by data 
              processing agreements. See{' '}
              <Link 
                href="https://supabase.com/privacy" 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase Privacy Policy
              </Link>.
            </p>
            <h4>6.2 GitHub OAuth</h4>
            <p>
              If you choose to authenticate via GitHub, we receive your GitHub 
              username and public profile information. GitHub&apos;s use of your data 
              is governed by the{' '}
              <Link 
                href="https://github.com/site/privacy" 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Privacy Statement
              </Link>.
            </p>
            <h4>6.3 Third-Party APIs</h4>
            <p>
              Emblems published on the Service may reference third-party APIs. 
              Use of these APIs is subject to each provider&apos;s privacy policy. 
              We are not responsible for the privacy practices of third-party API providers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>Depending on your location, you may have the following rights:</p>
            <h4>7.1 Access and Portability</h4>
            <p>
              You can access your account information and published content through 
              the Service interface. You may request a copy of your personal data 
              in a machine-readable format.
            </p>
            <h4>7.2 Correction</h4>
            <p>
              You can update your profile information and correct inaccuracies 
              through your account settings.
            </p>
            <h4>7.3 Deletion</h4>
            <p>
              You may request deletion of your account and personal data. Contact 
              us via GitHub Issues to initiate deletion. Note that:
            </p>
            <ul>
              <li>Published emblems may be retained if they have been used by others</li>
              <li>Certain data may be retained for legal compliance or security purposes</li>
              <li>Backups may retain data for up to 30 days after deletion</li>
            </ul>
            <h4>7.4 Objection and Restriction</h4>
            <p>
              You may object to certain processing of your data or request 
              restriction of processing in specific circumstances.
            </p>
            <h4>7.5 Withdrawal of Consent</h4>
            <p>
              Where processing is based on consent, you may withdraw consent at 
              any time without affecting the lawfulness of prior processing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Data Sharing</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>We do not sell your personal information. We may share data with:</p>
            <ul>
              <li><strong>Service Providers</strong> - Third parties that process data on our behalf (e.g., Supabase)</li>
              <li><strong>Legal Requirements</strong> - When required by law or to protect rights and safety</li>
              <li><strong>Business Transfers</strong> - In connection with merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent</strong> - In other situations with your permission</li>
            </ul>
            <p>
              Your published emblem content is shared publicly according to 
              the license you specify when publishing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Children&apos;s Privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              The Service is not intended for users under the age of 13. We do not 
              knowingly collect personal information from children under 13. If you 
              believe a child has provided us with personal information, please 
              contact us immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Your data may be transferred to and processed in countries other than 
              your country of residence. We take appropriate measures to ensure 
              adequate protection of your data in compliance with applicable data 
              protection laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              We may update this Privacy Policy from time to time. Material changes 
              will be notified via email or a prominent notice on the Service. 
              Continued use of the Service after changes constitutes acceptance of 
              the updated policy. We encourage you to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              For privacy-related questions or to exercise your rights, please 
              contact us through our{' '}
              <Link 
                href="https://github.com/Lo10Th/Elysium/issues" 
                className="text-primary hover:underline"
              >
                GitHub Issues
              </Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}