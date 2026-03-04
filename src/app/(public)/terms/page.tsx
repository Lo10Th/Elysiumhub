import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Elysium',
  description: 'Terms of Service for Elysium API App Store',
}

export default function TermsPage() {
  return (
    <div className="container py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground mt-2">
          Last updated: March 3, 2026
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              By accessing or using Elysium (&quot;the Service&quot;), available at hub.ely.karlharrenga.com, 
              you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to 
              these Terms, you may not access or use the Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Elysium 
              regarding your use of the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Elysium is an API App Store platform that enables users to discover, publish, 
              and use API emblems. The Service provides:
            </p>
            <ul>
              <li>A registry for API emblem definitions and metadata</li>
              <li>Tools for browsing and searching available APIs</li>
              <li>User accounts for publishing and managing emblems</li>
              <li>CLI tools for programmatic access to the registry</li>
              <li>Authentication services for secure access</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>3.1 Account Registration</h4>
            <p>
              To access certain features of the Service, you must register for an account. 
              You may register using:
            </p>
            <ul>
              <li>Email and password</li>
              <li>GitHub OAuth authentication</li>
            </ul>
            <h4>3.2 Account Responsibilities</h4>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly notify us of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <h4>3.3 API Tokens</h4>
            <p>
              You may generate API tokens for CLI and programmatic access to the Service. 
              You are responsible for maintaining the confidentiality of all tokens and 
              for all activities conducted using your tokens.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. User Content</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>4.1 Ownership</h4>
            <p>
              You retain ownership of any content you publish to the Service, including 
              emblem definitions, documentation, and metadata.
            </p>
            <h4>4.2 License Grant</h4>
            <p>
              By publishing content to the Service, you grant Elysium a non-exclusive, 
              worldwide, royalty-free license to:
            </p>
            <ul>
              <li>Store and display your content through the Service</li>
              <li>Make your content available to other users per your chosen license</li>
              <li>Index and search your content for discovery features</li>
            </ul>
            <h4>4.3 Content Restrictions</h4>
            <p>You agree not to publish content that:</p>
            <ul>
              <li>Violates any applicable law or regulation</li>
              <li>Infringes on intellectual property rights of others</li>
              <li>Contains malicious code, malware, or harmful components</li>
              <li>Exposes sensitive data without authorization</li>
              <li>Is deceptive, fraudulent, or misleading</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. API Usage</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>5.1 Fair Use</h4>
            <p>
              You agree to use the Service&apos;s API in accordance with fair use principles. 
              We may impose rate limits and usage quotas to ensure service quality.
            </p>
            <h4>5.2 Prohibited Uses</h4>
            <p>You may not use the API to:</p>
            <ul>
              <li>Attempt to circumvent security measures</li>
              <li>Overload or disrupt the Service infrastructure</li>
              <li>Scrape or harvest data without authorization</li>
              <li>Use automated tools that degrade service performance</li>
            </ul>
            <h4>5.3 Third-Party APIs</h4>
            <p>
              Emblems may reference third-party APIs. Elysium is not responsible for 
              the availability, pricing, or terms of third-party services. You are 
              responsible for obtaining necessary credentials and complying with 
              third-party terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Disclaimers</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>6.1 As-Is Service</h4>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES 
              OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
              AND NON-INFRINGEMENT.
            </p>
            <h4>6.2 No Guarantee</h4>
            <p>
              We do not guarantee that:
            </p>
            <ul>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Emblems will function as described by their publishers</li>
              <li>Third-party APIs referenced by emblems will be available</li>
              <li>Security measures will prevent all unauthorized access</li>
            </ul>
            <h4>6.3 User Content</h4>
            <p>
              We do not endorse, verify, or guarantee the accuracy of user-published 
              content. Use of emblems and third-party APIs is at your own risk.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELYSIUM SHALL NOT BE LIABLE FOR 
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, 
              INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, 
              WHETHER BASED ON CONTRACT, TORT, OR ANY OTHER LEGAL THEORY.
            </p>
            <p>
              Our total liability for any claims arising from your use of the Service 
              shall not exceed the amount paid by you to Elysium in the twelve (12) months 
              preceding the claim, or $100 USD if no payment was made.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              You agree to indemnify and hold harmless Elysium and its operators from 
              any claims, damages, losses, or expenses arising from:
            </p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Content you publish to the Service</li>
              <li>Your violation of any rights of third parties</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Termination</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h4>9.1 By You</h4>
            <p>
              You may terminate your account at any time by contacting us. Upon termination, 
              your access to the Service will cease, but your published content may remain 
              available under its license terms.
            </p>
            <h4>9.2 By Us</h4>
            <p>
              We may suspend or terminate your access to the Service at any time for:
            </p>
            <ul>
              <li>Violation of these Terms</li>
              <li>Conduct harmful to the Service or other users</li>
              <li>Extended periods of inactivity</li>
              <li>Legal or regulatory requirements</li>
            </ul>
            <h4>9.3 Effect of Termination</h4>
            <p>
              Upon termination, your right to use the Service immediately ceases. 
              Sections 4, 6, 7, 8, and 10 will survive termination.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              These Terms shall be governed by and construed in accordance with the laws 
              of the United States, without regard to conflict of law principles. Any 
              disputes arising from these Terms shall be resolved exclusively in the 
              courts of the applicable jurisdiction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              We reserve the right to modify these Terms at any time. Material changes 
              will be notified via email or a prominent notice on the Service. Continued 
              use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              For questions about these Terms, please contact us through our{' '}
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