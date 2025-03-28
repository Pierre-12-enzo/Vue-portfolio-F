// src/assets/js/custom.js
export function setupCustomjs() {
  //stack reading
  const customCursor = document.querySelector('.custom-cursor');
        const flipContainers = document.querySelectorAll('.flip-container');

        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.pageX}px`;
            customCursor.style.top = `${e.pageY}px`;
        });

        flipContainers.forEach((container) => {
            container.addEventListener('mouseenter', () => {
                customCursor.style.display = 'block';
            });

            container.addEventListener('mouseleave', () => {
                customCursor.style.display = 'none';
            });
        });
    
    // Wrap everything in a timeout or wait for the DOM to be ready
    window.addEventListener('load', () => {
      const cursor = document.querySelector('.cursor');
      const button = document.getElementById('topbtn');
      const closebtn = document.getElementById('closebtn');
      const sidenav = document.getElementById('sidenav');
  
      if (!cursor || !button || !closebtn || !sidenav) {
        console.error('Required elements are not found');
        return;
      }
  
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
      });
  
      window.onscroll = function() {
        if (document.documentElement.scrollTop > 570 || document.body.scrollTop > 570) {
          button.style.display = "block";
        } else {
          button.style.display = "none";
        }
      };
  
      button.addEventListener('click', () => {
        sidenav.style.width = "250px";
      });
  
      closebtn.addEventListener('click', () => {
        sidenav.style.width = "0px";
      });
    });
  }

  