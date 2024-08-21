# Verification Process

This document details how the verification process for the Discord server works.

You should have already registered your _confidential_ (not public type client)
Oauth2 application with Ion at https://ion.tjhsst.edu/oauth/applications. You
should have the client_id and client_secret, as well as a URI set up to redirect
to `/oauth/ion` on our website.

# Step 1: Having the user go to the authorization endpoint

Send the user to the authorization code endpoint. You can send the user to the
URL in any way: HTTP redirect, having the user click on a link, etc. It will
work as long as the user is at the URL.

The URL structure will be similar to this:

```
https://ion.tjhsst.edu/oauth/authorize
?response_type=code
&client_id=CLIENT_ID
&redirect_uri=REDIRECT_URI
&scope=read
```

The REDIRECT_URI should be `/oauth/ion`, unless it has been changed since the
time of writing.

Make sure you send the `client_id` _**NOT**_ the client secret.

Leave `response_type` and `scope` as it is.

The URL structure is pretty much standard Oauth2, so you can look up general
Oauth2 guides and they should work in this scenario.

# Step 2: Getting the authorization code

Once the user allows us to use the API, Ion will redirect the user to the
`redirect_uri`, which should be our website.

The request will look like a normal `GET` request originating from the user.
However, there will be a `?code` url param with the **authorization code**.

Store that **authorization code temporarily**. Don't return a response to the
client just yet.

# Step 3: Getting the access token

This should still be on the same thread/function as step 2.

Our **_server_** (not the user) will now take that **authorzation code** along
with the **client secret** and trade them for an **access token**.

The **access token** will allow us to use the Ion API.

The client in **client secret** refers to us, our server. The client does not
refer to the user. DO NOT SHARE THE CLIENT SECRET WITH THE USER.
