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
            }).catch(err => {
                console.error('Failed to copy address: ', err);
                alert('Failed to copy address.');
            });
        });
    }

    // --- LIVE WEB3 DATA FETCHING ---
    const contractAddress = "0xC7837e4D48f8B4c25d945bE54EA5E6030F1d3392";
    // Using a public Base RPC endpoint
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');

    // The contractABI variable is loaded from js/abi.js
    const rhntContract = new ethers.Contract(contractAddress, contractABI, provider);

    async function updateLiveSupply() {
        try {
            const supplyElement = document.getElementById('live-total-supply');
            if (!supplyElement) return;

            // Call the totalSupply() function from your contract
            const totalSupplyBigNumber = await rhntContract.totalSupply();
            
            // Tokens usually have 18 decimals, adjust if yours is different
            const decimals = 18; 
            const formattedSupply = ethers.utils.formatUnits(totalSupplyBigNumber, decimals);

            // Format to a clean number string (e.g., "888,000,000,000")
            const displaySupply = parseFloat(formattedSupply).toLocaleString('en-US', { maximumFractionDigits: 0 });

            supplyElement.innerText = displaySupply;

        } catch (error) {
            console.error("Failed to fetch total supply:", error);
            // If it fails, the static value from the HTML will remain visible
        }
    }

    // Run the function on page load
    updateLiveSupply();

    // --- Copy Donation Address ---
    const copyDonationBtn = document.getElementById("copy-donation-btn");
    const donationAddressEl = document.getElementById("donationAddress");
    if (copyDonationBtn && donationAddressEl) {
        copyDonationBtn.addEventListener("click", () => {
            const address = donationAddressEl.innerText;
            navigator.clipboard.writeText(address).then(() => {
                const originalText = copyDonationBtn.innerHTML;
                copyDonationBtn.innerHTML = "<i class=\"fas fa-check mr-2\"></i> Copied!";
                setTimeout(() => {
                    copyDonationBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy donation address: ", err);
                alert("Failed to copy donation address.");
            });
        });
    }
});
