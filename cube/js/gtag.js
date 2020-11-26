window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-22DMFKLBKF');
gtag('config', 'G-22DMFKLBKF', {'page_path': location.pathname + location.search + location.hash });

window.addEventListener("hashchange", e => {
    gtag('config', 'G-22DMFKLBKF', {'page_path': location.pathname + location.search + location.hash });
});
