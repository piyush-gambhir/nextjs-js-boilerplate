import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function TestEmail() {
  return (
    <Html>
      <Head />
      <Preview>{"Test Email"}</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="mx-auto my-auto bg-gray-100 font-sans">
            <Container className="mx-auto my-[40px] w-[465px] rounded-lg bg-white p-[20px] shadow-lg">
              <Section className="mb-[32px] mt-[32px] text-center">
                <Text className="mb-8 text-[16px] font-medium leading-[24px] text-gray-700">
                  This is a test email to confirm that our email service is
                  working perfectly. We are excited to have you on board!
                </Text>
              </Section>
              <Hr className="mx-0 my-[26px] w-full border border-solid border-gray-300" />

              <Text className="mt-2 text-center text-[12px] leading-[24px] text-gray-400">
                Next.js JavaSript Boilerplate
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
