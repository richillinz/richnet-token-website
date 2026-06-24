document.addEventListener('DOMContentLoaded', () => {

    // --- Close Construction Banner ---
    const closeBannerBtn = document.getElementById('close-banner-btn');
    const banner = document.getElementById('construction-banner');
    
    if (closeBannerBtn && banner) {
        closeBannerBtn.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }

    // --- Copy Contract Address ---
    const copyAddressBtn = document.getElementById('copy-address-btn');
    const contractAddressEl = document.getElementById('contractAddress');

    if (copyAddressBtn && contractAddressEl) {
        copyAddressBtn.addEventListener('click', () => {
            const address = contractAddressEl.innerText;
            navigator.clipboard.writeText(address).then(() => {
                // Visual feedback
                const originalText = copyAddressBtn.innerHTML;
                copyAddressBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copied!';
                setTimeout(() => {
                    copyAddressBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy address: ', err);
                alert('Failed to copy address.');
            });
        });
    }

});
