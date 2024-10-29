---
title: "I Put Google's Best AI in an iPhone"
imgUrl: "/src/assets/blog-images/i-put-googles-best-ai-in-an-iphone.jpg"
publishedAt: "Jan 18, 2024"
summary: "I created a Siri Shortcut that integrates the Gemini Pro API to build a more advanced AI assistant than Siri."
---

Learn how to build your own AI assistant using Google’s Gemini Pro API for free!

![](https://miro.medium.com/v2/resize:fit:13344/1*liYE4A3gSvjY25ACLx35Qg.png)

Supercharging your iPhone using Gemini and Siri Shortcuts

# How to build an overpowered Siri for your iPhone

![](https://miro.medium.com/v2/resize:fit:1400/1*oZFe58zuXecXrpRdQ44OwQ.png)

1. Make an account on Google AI Studio *(\_formerly known as _Makersuite)*: [https://makersuite.google.com/](https://makersuite.google.com/app/prompts/new_freeform)
2. You should be prompted by something similar to the above image once you accept their terms and conditions.
3. Click on ‘Get API key.’
4. Click on the ‘Create API key in new project’ button.
5. Please copy and paste the API key somewhere safe and ensure you don’t share it with anyone.
6. Download the Siri Shortcut from here: [https://whybhav.in/athena](https://whybhav.in/athena).
7. Click on “Get Shortcut” and then “Set Up Shortcut.”
8. **Paste your API key** and click on “Next.”
9. **Enter any Prompt/Context** for the AI. Example: “I want you to act as the world’s smartest personal AI assistant.” Click on “Add Shortcut.”
10. That’s it. You can now activate Siri and say “Run Athena” to converse with your new AI assistant.

## Note:

-   Say “Get me a new chat” to start a new conversation (AI will have no context of your previous messages if you start a new conversation)
-   Say “Over” to close out of Athena.
-   Athena works on iPhone, Mac, Apple Watch, and pretty much any Apple device that can run Siri Shortcuts.
-   Athena, or rather ATHENA, stands for **Advanced Tactical Help and Evaluation Network Assistant**.
-   If you have any queries, send an email to [**hi@whybhav.in**](mailto:hi@whybhav.in)

# What is Gemini?

> Gemini is a family of multimodal large language models developed by Google DeepMind, serving as the successor to LaMDA and PaLM 2. Comprising Gemini Ultra, Gemini Pro, and Gemini Nano, it was announced on December 6, 2023, positioned as a contender to OpenAI’s GPT-4.

![](https://miro.medium.com/v2/resize:fit:1400/1*QErq59ftEkOsvdwfIY_VWA.jpeg)

Google DeepMind’s Gemini

The title is a bit of a clickbait because, technically, Google’s best AI is the Gemini Ultra, but because we don’t have access to it, we will be using the next best thing at our disposal (Gemini Pro) for our little project. It also dramatically helps that it’s **free**, at least for now.

You can read more about Gemini in this blog post by Google: [https://blog.google/technology/ai/google-gemini-ai/](https://blog.google/technology/ai/google-gemini-ai/#sundar-note)

You can also check out their visit their website: [https://deepmind.google/technologies/gemini/](https://deepmind.google/technologies/gemini/#introduction)

Now that you know the “what”, let’s check out the “how.”

Under the Hood

To understand how this works, let’s look at the cURL command used to send an HTTP request to Google’s API

```bash

#!/bin/bash

API_KEY="YOUR_API_KEY"

curl \
  -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY} \
  -H 'Content-Type: application/json' \
  -d @<(echo '{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "YOUR_USER_INPUT"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.9,
    "topK": 1,
    "topP": 1,
    "maxOutputTokens": 2048,
    "stopSequences": []
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}')
```

## If you're new to all this:

1. `curl`: The command-line tool for making HTTP requests.
2. `-X POST`: Specifies that the HTTP request method is POST.
3. `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}` The URL to which the POST request is sent. `${API_KEY}` is a placeholder, and you need to replace it with an actual API key for authentication.
4. `-H 'Content-Type: application/json'`: Sets the request's content type to JSON.
5. `-d @<(echo '{ … }')`: Sends the specified JSON data in the request body. The data includes:

-   `"contents"`: An array containing user input. It includes a user role and text input.
-   `"generationConfig"`: Configuration settings for content generation, including temperature, top-k, top-p, max output tokens, and stop sequences.
-   `"safetySettings"`: Safety settings to block content that falls into specified harm categories with associated thresholds.

So, we're sending an HTTP request to Google with our input and fetching the output. Let's see how we can achieve this inside the Siri Shortcuts App.

Siri Shortcuts

The request body carries the payload/data that the server needs to process. And we can construct it using the Dictionary element in the Siri Shortcuts app.

![](https://miro.medium.com/v2/resize:fit:1400/1*EQG2NpSOsenSHU-CZ-g6Vg.png)

We are using a Dictionary to represent our request body.

Once you have downloaded it, You can edit the values in the shortcut to tweak the values of `temperature`, `topK`, `topP`, `safetySettings`, and pretty much anything to cater to your specific needs.

Further, we have a similar dictionary called `userMessage` with a `role` and `parts` object that takes in actual input and adds them to the `contents` array of our `requestBody`.

![](https://miro.medium.com/v2/resize:fit:1400/1*bS2Mz7M53E-VOv8C1HNeWQ.png)

userMessage object

We then use the ‘Get contents from URL’ element of Siri Shortcut to construct the actual request itself.

![](https://miro.medium.com/v2/resize:fit:1400/1*fUBrqAc9SDw2jJII7_Y_Qg.png)

Get contents from URL

The raw response from the API looks something like this

```bash

{
  "promptFeedback": {
    "safetyRatings": [
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "probability": "NEGLIGIBLE"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "probability": "NEGLIGIBLE"
      },
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "probability": "NEGLIGIBLE"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "probability": "NEGLIGIBLE"
      }
    ]
  },
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI_RESPONSE"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE"
        }
      ],
      "index": 0
    }
  ]
}
```

This response doesn’t make sense to everyone, but after some parsing, we can get the value for candidates, content, parts, and text to fetch the AI_RESPONSE and display it to the user.

But that’s not the end of it. We still need to add the `content` object from the response to our original `requestBody` so that our AI has the context of our previous queries when having conversations.

Thankfully, with a bit of tinkering around, I figured it out.

![](https://miro.medium.com/v2/resize:fit:1400/1*WJFsM7txOdurtjMBt0kt8A.png)

Updating the requestBody with the response

When you combine all this and throw in a couple of `if` statement blocks in the Shortcuts app, you have a better and more capable alternative to Siri.

# Taking it a step further

If you haven’t noticed by now, the shortcut functions on preset commands like “Get me a new chat” or “Over.” There is only one greeting that is triggered every time you invoke the shortcut: “Hello, I’m here.”

Firstly, you can very easily change the `newChatCommand` and `exitCommand` from “Get me a new chat” and “Over” respectively, to anything you want. Make sure the first letter of your command is capitalized if you want it to work over voice.

Secondly, instead of having one monotonous response every time you invoke the assistant, you can use a list instead of a static text that has, well… a list of things you want to have as greetings. Use the “Get Random Item from List” element for a new greeting each time.

![](https://miro.medium.com/v2/resize:fit:1400/1*jFarublFzjDl98eOkU9ziA.png)

List of welcome texts

You can do the same thing for `continueText`, `exitText`, and `newChatWelcomeText`

Feel free to play around with the shortcut, but be careful; don’t play around too much that you end up changing something that wasn’t supposed to be changed. There’s a fine line. Either way, if you run into any errors, you can contact me at [hi@whybhav.in](mailto:hi@whybhav.in) or anywhere below.

# Links

Subscribe to my **Weekly** **Newsletter**: [https://whybhav.substack.com](https://whybhav.substack.com/)  
Subscribe to my **YouTube** channel: [https://youtube.com/@whybhav](https://youtube.com/@whybhav)  
Subscribe to my **Patreon**: [https://patreon.com/whybhav](https://patreon.com/whybhav)

Follow me on **Instagram**: [https://instagram.com/reallywhybhav](https://instagram.com/reallywhybhav)  
Follow me on **Twitter**: [https://twitter.com/reallywhybhav](https://twitter.com/reallywhybhav)  
Follow me on **Reddit**: [https://reddit.com/whynotbhav](https://reddit.com/whynotbhav)

Visit **Website**: [https://whybhav.in](https://whybhav.in/)
