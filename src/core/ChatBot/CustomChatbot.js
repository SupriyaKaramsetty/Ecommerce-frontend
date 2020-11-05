import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
const  CustomChatbot = (props) => {
    const config = {
        width: "300px",
        height: "400px",
        floating: true
      };
      const steps = [
        {
           id: "Greet",
           message: "Hello, Welcome to our Organic beauty Shop",
           trigger: "Ask Name"
        },
        {
           id: "Ask Name",
           message: "Please type your name?",
           trigger: "Waiting user input for name"
        },
        {
           id: "Waiting user input for name",
           user: true,
           trigger: "input the firstquery"
        },

        {
           id: "input the firstquery",
           message: "Hi {previousValue}, You have any doubts regarding 'Why Organic'?",
           trigger: "whyorganic"
        },

        {
           id: "whyorganic",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "why organic reasons"
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Asking options to input the 2ndquery"
                      } 
                    ],
          
        },

        {
        	id: "why organic reasons",
        	message:"1.Non-organic skin care products contain harmful ingredient 2.Organic skincare products are made of natural ingredients. 3. Organic products are non-allergenic.. 6. You’re helping to preserve the environment...!ganic skincare products work better. 5. Going organic is better for your skin. 6. You’re helping to preserve the environment...!",
        	trigger:"Asking options to input the 2ndquery"
        },

        {
           id: "Asking options to input the 2ndquery",
           message: "Hi {previousValue}, Please select any one from the below provided options",
           trigger: "2ndquery options"
        },
        {
           id: "2ndquery options",
           options: [
                      {
                        value: "lipcare",
                        label: "Lipcare",
                        trigger: "triggering lipcare"
                      },
                      { 
                        value: "haircare",
                        label: "Haircare",
                        trigger: "triggering haircare"
                      } 
                    ]
        },
        {
           id: "triggering haircare",
           message: "The product, you received is the one you ordered for?",
           trigger: "Product received haircare"
        },
        {
           id: "Product received haircare",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "issue with the haircare product price"
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Done"
                      } 
                    ]
        },

        {
           id: "issue with the haircare product price",
           message: "Is there any issue with the product price?",
           trigger: "Answering to the haircare price issue"
        },

                {
           id: "Answering to the haircare price issue",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "answer to haircare price"
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Done"
                      } 
                    ]
        },
        {
           id: "answer to haircare price",
           message: "Oh Sad to hear that, We will let your issue to the company sales department and revert you back through a mail, Thanks",
           trigger: "query abt liking the haircare product"
         },
        {
           id:"query abt liking the haircare product",
           message: "Did you like the product?",
           trigger: "Answering liking the haircare product"
        },
        
 
        {
           id: "Answering liking the haircare product",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "Happymessage"
                        },
                    
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Sadmessage"
                      } 
                    ]
        },

        {
           id: "Happymessage",
           message: "Ohh!! Great, Thanks",
           trigger: "Done"
        },
        
        {
           id: "Sadmessage",
           message: "Ohh!! So, sry to get that from You, We would like to apologize for that and we will comeback with super-cool products real soon, hope you like' em",
           trigger: "Done"
        },
 

        {
           id: "triggering lipcare",
           message: "The product, you received is the one you ordered for?",
           trigger: "Product received lipcare"
        },

        {
           id: "Product received lipcare",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "issue with the lipcare product price"
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Done"
                      } 
                    ]
        },
        
        {
           id: "issue with the lipcare product price",
           message: "Is there any issue with the product price?",
           trigger: "Answering to the lipcare price issue"
        },
 
        {
           id: "Answering to the lipcare price issue",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "answer to lipcare price"
                      },
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Done"
                      } 
                    ]
        },
        {
           id: "answer to lipcare price",
           message: "Oh Sad to hear that, We will let your issue to the company sales department and revert you back through a mail, Thanks",
           trigger: "query abt liking the lipcare product"
         },
        {
           id:"query abt liking the lipcare product",
           message: "Did you like the product?",
           trigger: "Answering liking the lipcare product"
        
        },
 
        {
           id: "Answering liking the lipcare product",
           options: [
                      {
                        value: true,
                        label: "Yes",
                        trigger: "Happymessage"
                         },
                      
                      { 
                        value: "false",
                        label: "No",
                        trigger: "Sadmessage"
                      } 
                    ]
        },
         
        {
           id: "Happymessage",
           message: "Ohh!! Great, Thanks",
           trigger: "Done"
        },
        {
           id: "Sadmessage",
           message: "Ohh!! So, sry to get that from You, We would like to apologize for that and we will comeback with super-cool products real soon, hope you like' em",
           trigger: "Done"
        },
 
        {
            id: "Done",
            message: "Have a great day !!",
            end: true
        }
];

    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#00B2B2",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "#00B2B2",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c"
       };
  return (
    <ThemeProvider theme={theme}>
         <ChatBot steps={steps} {...config} />;
    </ThemeProvider>
  );
};
export default CustomChatbot;