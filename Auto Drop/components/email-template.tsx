import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  message: string;
  email: string;
  name: string;
  phone: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  email,
  name,
  phone,
}) => (
  <Html>
    <Head />
    <Preview>New message from auto drop contact us page.</Preview>
    <Tailwind>
      <Body className="bg-gray-100">
        <Container>
          <Section className="bg-white my-10 px-10 py-4 rounded-md border">
            <Heading className="leading-tight">
              New message from auto drop contact us page.
            </Heading>
            <Text>{message}</Text>
            <Hr />
            <Text>
              The sender&apos;s email is: {email}
              <br />
              The sender&apos;s name is: {name}
              <br />
              The sender&apos;s phone is: {phone}
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailTemplate;
