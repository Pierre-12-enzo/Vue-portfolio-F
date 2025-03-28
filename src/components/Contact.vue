<script setup>
import { ref } from 'vue';
import axios from 'axios';

const visitorEmail = ref('');
const message = ref('');
const errorMessage = ref('');

// Send message to backend
const sendMessage = async () => {
    try {
        errorMessage.value = '';
        const response = await axios.post('/api/contact', {
            visitorEmail: visitorEmail.value,
            message: message.value
        });
        if (response.status === 200) {
            visitorEmail.value = '';
            message.value = '';
        }
    } catch (err) {
        errorMessage.value = 'Failed to send the message. Please try again later.';
        console.error('Error sending message:', err);
    }
};
</script>

  
<template>
     <!--contact section-->
   <section id="contact" class="contact-section p-4 mt-4">
    <div class="container">
        <div class="row">
            <div class="col-lg-5 col-md-6">
              <p class="p-4 contact-cont">
            Let's Start Project Together:
             </p>  
             <p class="p-4 contact-cont">Join Me On This Links:</p>
             <div class="wrapper pt-5">
                   

                   <div class="button-link">
                      <div class="icon"><i class="bi bi-facebook"></i></div>
                      <span>Facebook</span>
                   </div>

                    <div class="button-link">
                        <div class="icon"><i class="bi bi-google"></i></div>
                        <span>Google</span>
                   </div>

                   <div class="button-link">
                         <div class="icon"><i class="bi bi-github"></i></div>
                         <span>Github</span>
                   </div>
  
                   <div class="button-link">
                        <div class="icon"><i class="bi bi-twitter"></i></div>
                        <span>Twitter</span>
                   </div>
                   
          
           </div>
            </div>
            <div class="col">
                <p class="p-4 contact-cont">Please Enter Your Information</p>
                <form class="form" @submit.prevent="sendMessage">
                    <div class="form-group p-3">
                        <label for="name" class="py-3">Email:</label>
                        <input type="email" v-model="visitorEmail" class="form-control p-2" placeholder="please enter email" required >
                    </div>
                    <div class="form-group p-3">
                        <label for="name" class="py-3">Message</label>
                        <textarea id="message" v-model="message" name="message" rows="6" cols="90" placeholder="Enter your message here..."></textarea>
                    </div>
                    <button type="submit" @click="sendMessage" class="btn btn-outline-primary mx-3">Send Message</button>

                    
                </form>
            </div>
        </div>
        
    </div>
   </section>
</template>
<style scoped>
/* Contact section */
.contact-section {
    background-color: var(--main-color);
}
.form-control {
    background: transparent;
    width: 300px;
}
label {
    font-size: 1rem;
    color: #bababa;
}
.form-control:focus {
    border-color: #8b0841;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    background: transparent;
    outline: none;
    color: white;
}
textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: vertical;
    box-sizing: border-box;
    margin-bottom: 10px;
    background: transparent;
    color: #fafafa;
}
textarea:focus {
    outline: none;
    border-color: #8b0841;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.btn-outline-primary{
    border-color: #8b0841;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.contact-cont {
    font-size: 1.58rem;
    color: #fff;
}

/*button links on footer*/
.wrapper .button-link {
    display: inline-block;
    height: 60px;
    width: 60px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 1);
    transition: all 0.3s ease-out;
    animation: fading-in 0.85s 0.4s backwards;
   
} 

.wrapper .button-link:hover{
    width: 200px;
    border-radius: 50px;
    cursor: pointer;
}

.wrapper .button-link .icon{
    display: inline-block;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    box-sizing: border-box;
    cursor: pointer;
}
.wrapper .button-link:nth-child(1):hover .icon  {
    background-color: #4267B2;
}
.wrapper .button-link:nth-child(2):hover .icon  {
    background-color: #254458;
}
.wrapper .button-link:nth-child(3):hover .icon  {
    background-color: #333;
}
.wrapper .button-link:nth-child(4):hover .icon  {
    background-color: #1DA1F2;
}
.wrapper .button-link .icon i{
    font-size: 25px;
    line-height: 60px;
    color: var(--main-color);
}

.wrapper .button-link span {
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
    margin-left: 10px;
}
.wrapper .button-link:nth-child(1):hover span {
    color: #4267B2;
}
.wrapper .button-link:nth-child(2):hover span  {
    color: #254458;
}
.wrapper .button-link:nth-child(3):hover span  {
    color: #333;
}
.wrapper .button-link:nth-child(4):hover span  {
    color: #1DA1F2;
}
</style>