// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', function () {
  const likeButtons = document.querySelectorAll('.like');
  // looping through the like button 
  likeButtons.forEach(function (likeButton) {
    //adding an event listner to the like button
      likeButton.addEventListener('click', async function () {
          const likeGlyph = this.querySelector('.like-glyph');
          const postId = this.closest('.media-post').id;

          try {
            //getting the response from the server call
              const response = await mimicServerCall();

              //handling the server response if successful
              if (likeGlyph.innerHTML === EMPTY_HEART) {
                //change the heart to full
                  likeGlyph.innerHTML = FULL_HEART;
                  //add the activated-heart to make it red 
                  likeGlyph.classList.add('activated-heart');
                  console.log(`Liked post with ID ${postId}`);
              } else {
                //change the heart to empty
                likeGlyph.innerHTML = EMPTY_HEART;
                // remove the activated heart-class
                likeGlyph.classList.remove('activated-heart');
                console.log(`Unliked post with ID ${postId}`);
              }
              //log the server response 
              console.log(response);
          } catch (error) {
            //handling the error if request fails
            console.error(`Error: ${error}`);
            
            // display the error message in the modal
            const modalMessage = document.getElementById('modal-message');
            modalMessage.textContent = error;

            //showing the modal by removing the hidden class
            const modal = document.getElementById('modal');
            modal.classList.remove('hidden')

            //hiding the modal after 3 seconds
            setTimeout(function () {
               modal.classList.add('hidden');
              }, 3000);
          }
        });
    });
});






//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
