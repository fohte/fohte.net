'use client'

import Script from 'next/script'

const GA_TRACKING_ID = 'G-RGKPSR5QL5'

// https://nextjs.org/docs/messages/next-script-for-ga
export const GoogleAnalytics: React.FC = () => (
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_TRACKING_ID}');
      `}
    </Script>
  </>
)
