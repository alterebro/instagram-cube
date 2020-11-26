window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-22DMFKLBKF');

window.addEventListener("hashchange", e => {
    gtag('config', 'G-22DMFKLBKF', {
        'page_title' : document.title + ' (' + location.hash + ')',
        'page_path': location.pathname + location.search + location.hash
    });
});
