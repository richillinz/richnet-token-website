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
                const originalText = copyAddressBtn.innerHTML;
                copyAddressBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copied!';
                setTimeout(() => {
                    copyAddressBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => console.error('Failed to copy address: ', err));
        });
    }

    // --- Copy Donation Address ---
    const copyDonationBtn = document.getElementById("copy-donation-btn");
    const donationAddressEl = document.getElementById("donationAddress");
    if (copyDonationBtn && donationAddressEl) {
        copyDonationBtn.addEventListener("click", () => {
            const address = donationAddressEl.innerText;
            navigator.clipboard.writeText(address).then(() => {
                const originalText = copyDonationBtn.innerHTML;
                copyDonationBtn.innerHTML = "<i class='fas fa-check mr-2'></i> Copied!";
                setTimeout(() => {
                    copyDonationBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => console.error("Failed to copy donation address: ", err));
        });
    }

    // --- LIVE WEB3 DATA FETCHING ---
    async function updateLiveSupply() {
        const supplyElement = document.getElementById('live-total-supply');
        if (!supplyElement) {
            console.error("Could not find the element with ID 'live-total-supply'.");
            return;
        }

        try {
            // Check if ethers library is loaded
            if (typeof ethers === 'undefined') {
                console.error("Ethers.js library is not loaded.");
                return;
            }

            const contractAddress = "0xC7837e4D48f8B4c25d945bE54EA5E6030F1d3392";
            const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
            const rhntContract = new ethers.Contract(contractAddress, contractABI, provider);

            // Fetch total supply and decimals in parallel for speed
            const [totalSupplyBigNumber, decimals] = await Promise.all([
                rhntContract.totalSupply(),
                rhntContract.decimals()
            ]);
            
            const formattedSupply = ethers.utils.formatUnits(totalSupplyBigNumber, decimals);
            const displaySupply = parseFloat(formattedSupply).toLocaleString('en-US', { maximumFractionDigits: 0 });

            supplyElement.innerText = displaySupply;
            console.log("Successfully fetched and updated total supply:", displaySupply);

        } catch (error) {
            console.error("Failed to fetch total supply from blockchain:", error);
            // On failure, the static value in the HTML will remain visible
        }
    }

    // Run the function
    updateLiveSupply();
});
