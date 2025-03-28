export function Flip() {
      //stack reading
  document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
}); 
}