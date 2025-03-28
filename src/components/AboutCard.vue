
<template>
     <!--about me-->
   <center><p style="font-size: 2.0rem; font-weight: bold;">ABOUT ME</p></center>  

<!--about section-->
 <section id="about" class="p-5 mt-0">
  <div class="box"></div>
   <div class="container">
     
     <div class="row mt-3 p-3 mx-0">
      <div class="about-container p-4">
          <p>Greetings!! I'm  Dusenge Enzo, As a web developer, I am passionate about creating dynamic, user-friendly websites. My journey in web development began with learning HTML, CSS, and JavaScript, and has since expanded to include various modern frameworks and libraries. I thrive on the challenge of turning complex requirements into functional, efficient code. I am dedicated to continuous learning, ensuring that I stay updated with the latest trends and technologies in the field.</p>

      </div>
             </div>
     <div class="row mt-3 p-3">
      <div class="about-container p-4">
          <p>My experience as a web designer allows me to blend creativity with technical skills to create visually appealing and intuitive websites. I have a keen eye for detail and a strong understanding of color theory, typography, and layout design principles. My goal is to create designs that not only look great but also provide an excellent user experience. I believe that design is a crucial aspect of any website, as it directly impacts how users interact with and perceive a brand.
          </p> 
      </div>
       
     </div>
       <div class="row mt-3 p-3">
          <div class="about-container p-4">
               <p>As a full-stack developer, I enjoy the versatility of working on both the front-end and back-end of web applications. My skill set includes proficiency in server-side programming languages like PHP and Node.js, as well as database management with MySQL and MongoDB. I take pride in being able to build complete, robust applications from the ground up. Whether it's creating an interactive user interface or developing a scalable backend, I am equipped to handle every aspect of web development.</p> 

          </div>
              
          </div>
   </div>
 </section>
</template>
<style scoped>
/*About section */
.text-center {
    color: rgba(0, 0, 0, 0.5);
    background-color: #fff;
    box-shadow: 0px 4px 0 0px rgba(0, 0, 0, 0.5);
    width: 200px;
    border-radius: 40px;
    border: 13px solid #fafafa;
    font-size: 1.12rem;
    cursor: pointer;
    height: 80px;
    position: relative;
    left: 30%;
}


#about {
    position: relative;
    width: 100%;
    display: flex;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-family: Poppins, sans-serif;
    overflow: hidden;
}
.about-container {
    margin: auto;
    border-radius: 10px;
    border: 13px solid #fafafa;
    width: 100%;
    box-shadow: 4px 12px 40px 6px rgba(0, 0, 0, .09);
    z-index: 100;

}
.box {
    position: absolute;
    background-attachment: fixed;
    z-index: 88;
    left: 50%; 
    height: 225px;
    width: 225px;
    transition: .4s ease;
    background: #fff;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
}
.box::after {
    content: '';
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 8px;
    right: -15px;
    height: 100%;
    width: 15px;
    transform: skewY(45deg);
}
.box::before {
    content: '';
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: -15px;
    left: 8px;
    height: 15px;
    width: 100%;
    transform: skewX(45deg);
}
</style>