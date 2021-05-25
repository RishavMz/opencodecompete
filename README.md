# MultiplayerGame

Some documentation:
Whenever browser accesses backend from browser, a new session starts. Ends when the browser is closed;
Redis store used to store session data temporarily.
Login authentication done from postgres server.
Upon login: username stored in sesssion.
If user wants to remember me, cookie generated at browser with value as username. Same cookie data stored at redis server for verification.
When user logs out, session destroyed and if any cookie set with giver username: removed from redis server.

To Do: 
Instead of storing username in session, store user id in session for futher relational mapping with matches.