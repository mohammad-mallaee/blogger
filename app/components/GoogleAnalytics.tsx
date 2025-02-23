import Script from "next/script";

export default function GoogleAnalytics() {
    const id = process.env.ANALYTICS_ID
    if (!id) return <></>
    return <>
        <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', "${id}");
        `}
        </Script>
    </>
}