import { Concept } from "@/types";

export const concepts: Concept[] = [
  {
    id: "1",
    slug: "endpoint",
    title: "Endpoint",
    shortDescription: "A URL that represents a resource.",
    category: "fundamentals",
    icon: "🔗",
    color: "blue",
    explanation:
      "An API endpoint is a specific URL where an API receives requests. Think of it as a door into a system — each door leads to a different room (resource). Endpoints are composed of a base URL and a path, and they represent specific resources or actions in your API.",
    keyPoints: [
      "Endpoints are URLs that point to specific API resources",
      "They follow a RESTful structure: /api/v1/resource/{id}",
      "Each endpoint should represent a single resource or collection",
      "Use nouns for resource names, not verbs (e.g., /users not /getUsers)",
    ],
    codeExample: {
      language: "http",
      title: "Common Endpoint Patterns",
      description: "RESTful endpoint examples for a User resource",
      code: `# Base URL
https://api.example.com

# Collection endpoints
GET    /api/v1/users          # List all users
POST   /api/v1/users          # Create a user

# Item endpoints
GET    /api/v1/users/123      # Get user by ID
PUT    /api/v1/users/123      # Update user
DELETE /api/v1/users/123      # Delete user

# Nested resources
GET    /api/v1/users/123/posts    # User's posts
GET    /api/v1/users/123/posts/5  # Specific post`,
      runnable: true,
      mockResponse: `{
  "id": 123,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}`,
    },
    quiz: [
      {
        id: "ep-1",
        question: "What is an API endpoint?",
        options: [
          "A programming language for APIs",
          "A specific URL where an API receives requests",
          "A type of database",
          "A security protocol",
        ],
        correctIndex: 1,
        explanation:
          "An API endpoint is a specific URL that represents a resource or action in the API. It's where clients send requests to interact with the API.",
      },
      {
        id: "ep-2",
        question: "Which endpoint naming convention follows REST best practices?",
        options: ["/getUsers", "/users", "/retrieveAllUsers", "/UserList"],
        correctIndex: 1,
        explanation:
          "REST best practices recommend using nouns (not verbs) for resource names, and using lowercase. /users is the correct RESTful endpoint.",
      },
      {
        id: "ep-3",
        question: "What does GET /api/v1/users/123/posts return?",
        options: [
          "All users",
          "User with ID 123",
          "Posts belonging to user 123",
          "Post with ID 123",
        ],
        correctIndex: 2,
        explanation:
          "This nested endpoint returns the posts that belong to user 123. It's a nested resource endpoint pattern.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Sends request", type: "client" },
      { id: "url", label: "URL Router", description: "Matches endpoint pattern", type: "gateway" },
      { id: "handler", label: "Handler", description: "Processes request", type: "server" },
      { id: "db", label: "Database", description: "Returns data", type: "database" },
    ],
  },
  {
    id: "2",
    slug: "http-methods",
    title: "HTTP Methods",
    shortDescription: "Actions performed on resources.",
    category: "fundamentals",
    icon: "⚡",
    color: "yellow",
    explanation:
      "HTTP methods (also called HTTP verbs) define the type of action to be performed on a resource. They are the vocabulary of REST APIs. Each method has a specific semantic meaning and tells the server what operation to execute.",
    keyPoints: [
      "GET: Retrieve data (read-only, safe, idempotent)",
      "POST: Create new resources",
      "PUT: Replace/update entire resource (idempotent)",
      "PATCH: Partially update a resource",
      "DELETE: Remove a resource (idempotent)",
    ],
    codeExample: {
      language: "javascript",
      title: "HTTP Methods with Fetch API",
      description: "Examples of different HTTP methods using the Fetch API",
      code: `// GET - Retrieve a user
const user = await fetch('/api/users/123');

// POST - Create a new user
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bob', email: 'bob@example.com' })
});

// PUT - Replace entire user object
const updated = await fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bob Smith', email: 'bob@example.com', age: 30 })
});

// PATCH - Update only specific fields
const patched = await fetch('/api/users/123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ age: 31 })
});

// DELETE - Remove a user
const deleted = await fetch('/api/users/123', { method: 'DELETE' });`,
      runnable: true,
      mockResponse: `// POST response
{
  "id": 124,
  "name": "Bob",
  "email": "bob@example.com",
  "createdAt": "2024-01-15T11:00:00Z"
}`,
    },
    quiz: [
      {
        id: "hm-1",
        question: "Which HTTP method should you use to partially update a resource?",
        options: ["PUT", "POST", "PATCH", "UPDATE"],
        correctIndex: 2,
        explanation:
          "PATCH is used for partial updates. PUT replaces the entire resource, while PATCH only updates the specified fields.",
      },
      {
        id: "hm-2",
        question: "Which HTTP method is considered 'safe' (no side effects)?",
        options: ["POST", "PUT", "GET", "DELETE"],
        correctIndex: 2,
        explanation:
          "GET is safe because it only retrieves data and does not modify server state. POST, PUT, and DELETE all modify resources.",
      },
      {
        id: "hm-3",
        question: "What does 'idempotent' mean for HTTP methods?",
        options: [
          "The method is secure",
          "Calling it multiple times gives the same result",
          "The method returns no data",
          "The method requires authentication",
        ],
        correctIndex: 1,
        explanation:
          "Idempotent means calling the method multiple times produces the same result. GET, PUT, and DELETE are idempotent. POST is not.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Chooses method", type: "client" },
      { id: "server", label: "Server", description: "Receives method", type: "server" },
      { id: "router", label: "Router", description: "Routes by method", type: "gateway" },
      { id: "db", label: "Resource", description: "CRUD operation", type: "database" },
    ],
  },
  {
    id: "3",
    slug: "request-response",
    title: "Request-Response",
    shortDescription: "Headers, body, query params, status codes.",
    category: "fundamentals",
    icon: "📡",
    color: "green",
    explanation:
      "The request-response cycle is the fundamental communication pattern of HTTP APIs. A client sends a request with headers, body, and parameters; the server processes it and returns a response with a status code, headers, and body. Understanding this cycle is essential for working with any API.",
    keyPoints: [
      "Request: method + URL + headers + optional body",
      "Headers carry metadata (Content-Type, Authorization, etc.)",
      "Query params filter/sort data: ?page=1&limit=10",
      "Response includes status code + headers + body",
    ],
    codeExample: {
      language: "http",
      title: "Full Request-Response Example",
      description: "Complete HTTP request and response with all components",
      code: `# HTTP Request
GET /api/v1/users?page=1&limit=10 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
Accept: application/json
User-Agent: MyApp/1.0

# Query Parameters
?page=1       # pagination
&limit=10     # items per page
&sort=name    # sort field
&order=asc    # sort direction

# HTTP Response
HTTP/1.1 200 OK
Content-Type: application/json
X-Total-Count: 100
X-Rate-Limit-Remaining: 99

{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}`,
      runnable: true,
      mockResponse: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 100 }
}`,
    },
    quiz: [
      {
        id: "rr-1",
        question: "Where are query parameters placed in an HTTP request?",
        options: ["In the request body", "In the URL after '?'", "In the headers", "In cookies"],
        correctIndex: 1,
        explanation:
          "Query parameters are appended to the URL after a '?' character, formatted as key=value pairs separated by '&'.",
      },
      {
        id: "rr-2",
        question: "What HTTP header specifies the format of the request body?",
        options: ["Accept", "Content-Type", "Authorization", "User-Agent"],
        correctIndex: 1,
        explanation:
          "Content-Type specifies the media type of the request body (e.g., application/json). Accept specifies what format the client expects in the response.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Builds request", type: "client" },
      { id: "network", label: "Network", description: "Transmits data", type: "arrow" },
      { id: "server", label: "Server", description: "Processes request", type: "server" },
      { id: "response", label: "Response", description: "Returns to client", type: "arrow" },
    ],
  },
  {
    id: "4",
    slug: "status-codes",
    title: "Status Codes",
    shortDescription: "Server response result indicator.",
    category: "fundamentals",
    icon: "🔢",
    color: "red",
    explanation:
      "HTTP status codes are 3-digit numbers that indicate the outcome of an HTTP request. They are grouped into five classes: 1xx (informational), 2xx (success), 3xx (redirection), 4xx (client errors), and 5xx (server errors).",
    keyPoints: [
      "2xx: Success — 200 OK, 201 Created, 204 No Content",
      "3xx: Redirection — 301 Moved Permanently, 304 Not Modified",
      "4xx: Client errors — 400 Bad Request, 401 Unauthorized, 404 Not Found",
      "5xx: Server errors — 500 Internal Server Error, 503 Service Unavailable",
    ],
    codeExample: {
      language: "javascript",
      title: "Handling Status Codes",
      description: "How to handle different HTTP status codes in JavaScript",
      code: `async function apiRequest(url) {
  const response = await fetch(url);

  switch (response.status) {
    case 200: // OK
      return await response.json();

    case 201: // Created
      console.log('Resource created successfully');
      return await response.json();

    case 204: // No Content
      console.log('Success, no content to return');
      return null;

    case 400: // Bad Request
      throw new Error('Invalid request data');

    case 401: // Unauthorized
      throw new Error('Please log in');

    case 403: // Forbidden
      throw new Error('Access denied');

    case 404: // Not Found
      throw new Error('Resource not found');

    case 429: // Too Many Requests
      throw new Error('Rate limit exceeded');

    case 500: // Internal Server Error
      throw new Error('Server error, try again later');

    default:
      throw new Error(\`Unexpected status: \${response.status}\`);
  }
}`,
      runnable: true,
      mockResponse: `// 201 Created
{
  "status": 201,
  "message": "User created successfully",
  "data": { "id": 125, "name": "Charlie" }
}`,
    },
    quiz: [
      {
        id: "sc-1",
        question: "What does HTTP status code 404 mean?",
        options: [
          "Server error",
          "Unauthorized access",
          "Resource not found",
          "Request successful",
        ],
        correctIndex: 2,
        explanation:
          "404 Not Found means the requested resource does not exist on the server. It's a client error (4xx range).",
      },
      {
        id: "sc-2",
        question: "Which status code indicates a successful resource creation?",
        options: ["200", "201", "204", "202"],
        correctIndex: 1,
        explanation:
          "201 Created is returned when a POST request successfully creates a new resource. 200 is for general success.",
      },
      {
        id: "sc-3",
        question: "What does a 5xx status code indicate?",
        options: [
          "Client made an error",
          "Authentication required",
          "Server-side error",
          "Redirect needed",
        ],
        correctIndex: 2,
        explanation:
          "5xx codes indicate server-side errors. The server failed to fulfill a valid request.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Sends request", type: "client" },
      { id: "server", label: "Server", description: "Processes request", type: "server" },
      { id: "code", label: "Status Code", description: "Determines outcome", type: "gateway" },
      { id: "response", label: "Response", description: "2xx/3xx/4xx/5xx", type: "arrow" },
    ],
  },
  {
    id: "5",
    slug: "authentication",
    title: "Authentication",
    shortDescription: "Verify identity of user.",
    category: "security",
    icon: "🔐",
    color: "purple",
    explanation:
      "Authentication verifies who you are. It's the process of confirming the identity of a user or service trying to access an API. Common methods include API keys, JWT tokens, OAuth, and Basic Auth.",
    keyPoints: [
      "API Keys: Simple tokens, good for server-to-server",
      "JWT (JSON Web Tokens): Stateless, self-contained tokens",
      "Basic Auth: Base64-encoded username:password (use HTTPS only)",
      "Bearer tokens: Passed in Authorization header",
    ],
    codeExample: {
      language: "javascript",
      title: "Authentication Methods",
      description: "Different ways to authenticate API requests",
      code: `// 1. API Key in header
fetch('/api/data', {
  headers: { 'X-API-Key': 'your-api-key-here' }
});

// 2. Bearer Token (JWT)
fetch('/api/profile', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
});

// 3. Basic Auth
const credentials = btoa('username:password');
fetch('/api/login', {
  headers: { 'Authorization': \`Basic \${credentials}\` }
});

// 4. JWT Payload (decoded)
const jwtPayload = {
  sub: "user_123",       // Subject (user ID)
  name: "Alice Johnson",
  email: "alice@example.com",
  iat: 1516239022,       // Issued at
  exp: 1516242622        // Expiration
};`,
      runnable: true,
      mockResponse: `{
  "authenticated": true,
  "user": {
    "id": "user_123",
    "name": "Alice Johnson",
    "email": "alice@example.com"
  },
  "tokenExpires": "2024-01-15T12:00:00Z"
}`,
    },
    quiz: [
      {
        id: "auth-1",
        question: "What is the primary purpose of authentication?",
        options: [
          "Determine what a user can do",
          "Verify who the user is",
          "Encrypt data in transit",
          "Rate limit requests",
        ],
        correctIndex: 1,
        explanation:
          "Authentication verifies identity — who you are. Authorization (a different concept) determines what you can do.",
      },
      {
        id: "auth-2",
        question: "Where is a Bearer token typically sent?",
        options: [
          "In the URL",
          "In the request body",
          "In the Authorization header",
          "In a cookie",
        ],
        correctIndex: 2,
        explanation:
          "Bearer tokens are sent in the HTTP Authorization header with the format: 'Authorization: Bearer <token>'.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Sends credentials", type: "client" },
      { id: "auth", label: "Auth Server", description: "Validates identity", type: "server" },
      { id: "token", label: "Token", description: "Issues access token", type: "token" },
      { id: "api", label: "API", description: "Accepts valid token", type: "server" },
    ],
  },
  {
    id: "6",
    slug: "authorization",
    title: "Authorization",
    shortDescription: "Decide what user can access.",
    category: "security",
    icon: "🛡️",
    color: "indigo",
    explanation:
      "Authorization determines what an authenticated user is allowed to do. While authentication answers 'Who are you?', authorization answers 'What are you allowed to do?'. Common patterns include RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control).",
    keyPoints: [
      "Authorization happens AFTER authentication",
      "RBAC: Users have roles (admin, user, moderator)",
      "Permissions are attached to roles",
      "Always enforce on the server, never trust client",
    ],
    codeExample: {
      language: "javascript",
      title: "Role-Based Authorization",
      description: "Implementing RBAC middleware in Node.js/Express",
      code: `// Define roles and permissions
const permissions = {
  admin:     ['read', 'write', 'delete', 'manage_users'],
  moderator: ['read', 'write', 'delete'],
  user:      ['read', 'write'],
  guest:     ['read']
};

// Authorization middleware
function authorize(requiredPermission) {
  return (req, res, next) => {
    const userRole = req.user.role; // From JWT after auth
    const userPerms = permissions[userRole] || [];

    if (!userPerms.includes(requiredPermission)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions'
      });
    }
    next();
  };
}

// Usage in routes
app.delete('/api/posts/:id',
  authenticate,              // First verify identity
  authorize('delete'),       // Then check permission
  async (req, res) => {
    // Delete the post
  }
);`,
      runnable: true,
      mockResponse: `// 403 Forbidden (guest trying to write)
{
  "error": "Forbidden",
  "message": "Insufficient permissions",
  "required": "write",
  "userRole": "guest"
}`,
    },
    quiz: [
      {
        id: "az-1",
        question: "What is the difference between authentication and authorization?",
        options: [
          "They are the same thing",
          "Auth = who you are, Authz = what you can do",
          "Auth = what you can do, Authz = who you are",
          "Authentication is for APIs only",
        ],
        correctIndex: 1,
        explanation:
          "Authentication verifies identity (who you are), while Authorization determines permissions (what you can do). They are distinct concepts.",
      },
      {
        id: "az-2",
        question: "What HTTP status code should be returned for authorization failure?",
        options: ["401", "403", "404", "500"],
        correctIndex: 1,
        explanation:
          "403 Forbidden is returned when authentication succeeded but the user lacks permission. 401 is for authentication failure (not logged in).",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Sends request", type: "client" },
      { id: "auth", label: "Authentication", description: "Who are you?", type: "token" },
      { id: "authz", label: "Authorization", description: "What can you do?", type: "gateway" },
      { id: "resource", label: "Resource", description: "Grants/denies access", type: "server" },
    ],
  },
  {
    id: "7",
    slug: "access-tokens",
    title: "Access Tokens",
    shortDescription: "Proof of access rights.",
    category: "security",
    icon: "🎫",
    color: "orange",
    explanation:
      "Access tokens are credentials that prove a user or service has been authenticated and authorized. They are typically short-lived strings (often JWTs) that clients include in API requests. They have an expiry time and can be refreshed using refresh tokens.",
    keyPoints: [
      "Access tokens are short-lived (minutes to hours)",
      "Refresh tokens are long-lived and used to get new access tokens",
      "JWTs are self-contained: header.payload.signature",
      "Never store tokens in localStorage — use httpOnly cookies",
    ],
    codeExample: {
      language: "javascript",
      title: "JWT Access Token Flow",
      description: "Login, use token, refresh token lifecycle",
      code: `// 1. Login and receive tokens
const { accessToken, refreshToken } = await fetch('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
}).then(r => r.json());

// JWT structure (decoded):
// Header: { "alg": "HS256", "typ": "JWT" }
// Payload: { "sub": "123", "exp": 1716239022 }
// Signature: HMACSHA256(base64(header) + base64(payload), secret)

// 2. Use access token for API calls
const data = await fetch('/api/profile', {
  headers: { 'Authorization': \`Bearer \${accessToken}\` }
});

// 3. Refresh when expired (401 received)
async function refreshAccessToken() {
  const res = await fetch('/auth/refresh', {
    method: 'POST',
    headers: { 'Authorization': \`Bearer \${refreshToken}\` }
  });
  const { accessToken: newToken } = await res.json();
  return newToken;
}

// 4. Auto-refresh interceptor
async function apiCall(url) {
  let response = await fetch(url, { headers: getAuthHeaders() });
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    response = await fetch(url, { headers: { Authorization: \`Bearer \${newToken}\` } });
  }
  return response.json();
}`,
      runnable: true,
      mockResponse: `{
  "accessToken": "eyJhbGci...",
  "refreshToken": "dGhpcyBpcy...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}`,
    },
    quiz: [
      {
        id: "at-1",
        question: "What is the typical lifespan of an access token?",
        options: ["Years", "Months", "Minutes to hours", "Milliseconds"],
        correctIndex: 2,
        explanation:
          "Access tokens are short-lived (typically 15 minutes to a few hours) for security. Refresh tokens are longer-lived and used to obtain new access tokens.",
      },
      {
        id: "at-2",
        question: "What are the three parts of a JWT?",
        options: [
          "Username, password, salt",
          "Header, payload, signature",
          "Client, server, token",
          "ID, secret, expiry",
        ],
        correctIndex: 1,
        explanation:
          "A JWT consists of: Header (algorithm info), Payload (claims/data), and Signature (verification), separated by dots.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Login request", type: "client" },
      { id: "auth", label: "Auth Server", description: "Validates credentials", type: "server" },
      { id: "token", label: "Access Token", description: "Short-lived JWT", type: "token" },
      { id: "api", label: "Resource API", description: "Verifies token", type: "server" },
    ],
  },
  {
    id: "8",
    slug: "oauth-2",
    title: "OAuth 2.0",
    shortDescription: "Secure delegated user access.",
    category: "security",
    icon: "🔑",
    color: "teal",
    explanation:
      "OAuth 2.0 is an authorization framework that lets users grant third-party applications access to their resources without sharing passwords. It's the standard behind 'Sign in with Google/GitHub'. The key concept is delegated authorization.",
    keyPoints: [
      "4 roles: Resource Owner, Client, Auth Server, Resource Server",
      "Authorization Code flow: Most secure for web apps",
      "PKCE: Protects against code interception attacks",
      "Scopes define what access is being requested",
    ],
    codeExample: {
      language: "javascript",
      title: "OAuth 2.0 Authorization Code Flow",
      description: "Step-by-step OAuth flow with PKCE",
      code: `// Step 1: Redirect user to authorization server
const authUrl = new URL('https://github.com/login/oauth/authorize');
authUrl.searchParams.set('client_id', 'YOUR_CLIENT_ID');
authUrl.searchParams.set('redirect_uri', 'https://yourapp.com/callback');
authUrl.searchParams.set('scope', 'read:user user:email');
authUrl.searchParams.set('state', generateRandomState()); // CSRF protection
window.location.href = authUrl.toString();

// Step 2: GitHub redirects back with code
// URL: https://yourapp.com/callback?code=abc123&state=xyz

// Step 3: Exchange code for access token (server-side!)
const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new URLSearchParams({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET', // Never expose to browser!
    code: 'abc123',
    redirect_uri: 'https://yourapp.com/callback'
  })
});

const { access_token } = await tokenResponse.json();

// Step 4: Use token to access user data
const user = await fetch('https://api.github.com/user', {
  headers: { 'Authorization': \`Bearer \${access_token}\` }
});`,
      runnable: true,
      mockResponse: `{
  "access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "token_type": "bearer",
  "scope": "read:user,user:email"
}`,
    },
    quiz: [
      {
        id: "oauth-1",
        question: "What problem does OAuth 2.0 solve?",
        options: [
          "Encrypting API responses",
          "Delegated access without sharing passwords",
          "Rate limiting API calls",
          "Generating JWT tokens",
        ],
        correctIndex: 1,
        explanation:
          "OAuth 2.0 allows users to grant third-party apps access to their resources without sharing their password. It's delegated authorization.",
      },
      {
        id: "oauth-2",
        question: "In OAuth flow, where should the token exchange happen?",
        options: [
          "In the browser (client-side)",
          "In localStorage",
          "On the server-side",
          "In a mobile app",
        ],
        correctIndex: 2,
        explanation:
          "The authorization code should be exchanged for tokens on the server-side to keep the client_secret secure. Never expose client secrets to the browser.",
      },
    ],
    diagramSteps: [
      { id: "user", label: "User", description: "Approves access", type: "client" },
      { id: "authserver", label: "Auth Server", description: "Issues auth code", type: "server" },
      { id: "app", label: "Your App", description: "Exchanges code", type: "gateway" },
      { id: "resource", label: "Resource API", description: "Returns data", type: "database" },
    ],
  },
  {
    id: "9",
    slug: "rate-limiting",
    title: "Rate Limiting",
    shortDescription: "Restrict excessive API usage.",
    category: "performance",
    icon: "🚦",
    color: "red",
    explanation:
      "Rate limiting controls how many requests a client can make in a given time window. It protects APIs from abuse, DoS attacks, and ensures fair usage among all clients. Rate limits are typically communicated via response headers.",
    keyPoints: [
      "Common limit: 100 requests per 15 minutes per user",
      "Response headers: X-RateLimit-Limit, X-RateLimit-Remaining",
      "429 Too Many Requests is the status code for exceeded limits",
      "Implement exponential backoff when retrying",
    ],
    codeExample: {
      language: "javascript",
      title: "Rate Limiting Client-Side Handling",
      description: "Handle rate limits with retry and backoff logic",
      code: `// Check rate limit headers
const response = await fetch('/api/data');
const limit = response.headers.get('X-RateLimit-Limit');     // e.g., 100
const remaining = response.headers.get('X-RateLimit-Remaining'); // e.g., 45
const reset = response.headers.get('X-RateLimit-Reset');     // Unix timestamp

console.log(\`API calls: \${remaining}/\${limit} remaining\`);

// Handle 429 with exponential backoff
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') ||
                         Math.pow(2, attempt); // exponential backoff
      console.log(\`Rate limited. Waiting \${retryAfter}s...\`);
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      continue;
    }

    return response.json();
  }
  throw new Error('Max retries exceeded');
}

// Server-side rate limiter (Express + rate-limiter-flexible)
const rateLimiter = new RateLimiterMemory({
  points: 100,   // requests
  duration: 900, // per 15 minutes
});`,
      runnable: true,
      mockResponse: `HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1716239622
Retry-After: 120

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 2 minutes."
}`,
    },
    quiz: [
      {
        id: "rl-1",
        question: "What HTTP status code indicates a rate limit has been exceeded?",
        options: ["400", "401", "403", "429"],
        correctIndex: 3,
        explanation:
          "429 Too Many Requests is the standard status code when a client exceeds the rate limit. The response may include a Retry-After header.",
      },
      {
        id: "rl-2",
        question: "What is 'exponential backoff'?",
        options: [
          "Increasing request speed after failures",
          "Waiting exponentially longer between retries",
          "Limiting the number of API endpoints",
          "Compressing API responses",
        ],
        correctIndex: 1,
        explanation:
          "Exponential backoff means waiting progressively longer between retry attempts (1s, 2s, 4s, 8s...) to avoid overwhelming the server.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Makes requests", type: "client" },
      { id: "limiter", label: "Rate Limiter", description: "Counts requests", type: "gateway" },
      { id: "allow", label: "Allow/Block", description: "Under/over limit", type: "token" },
      { id: "api", label: "API Server", description: "Processes if allowed", type: "server" },
    ],
  },
  {
    id: "10",
    slug: "throttling",
    title: "Throttling",
    shortDescription: "Slow down client requests.",
    category: "performance",
    icon: "🐌",
    color: "amber",
    explanation:
      "Throttling slows down request processing rather than blocking them entirely. Unlike rate limiting which rejects excess requests, throttling queues or delays them. It's used to control the speed of API consumption and protect backend services from overload.",
    keyPoints: [
      "Throttling delays requests; rate limiting rejects them",
      "Useful for protecting slow downstream services",
      "Client-side throttling: debouncing and throttling functions",
      "Server-side: token bucket or leaky bucket algorithms",
    ],
    codeExample: {
      language: "javascript",
      title: "Throttling vs Debouncing",
      description: "Client-side throttling techniques for API calls",
      code: `// THROTTLE: Execute at most once per interval
function throttle(fn, intervalMs) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= intervalMs) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// DEBOUNCE: Execute only after delay with no new calls
function debounce(fn, delayMs) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

// Throttle API calls to max 1 per second
const throttledSearch = throttle(async (query) => {
  const results = await fetch(\`/api/search?q=\${query}\`);
  return results.json();
}, 1000);

// Debounce: only search after user stops typing for 300ms
const debouncedSearch = debounce(async (query) => {
  const results = await fetch(\`/api/search?q=\${query}\`);
  return results.json();
}, 300);

// Attach to search input
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});`,
      runnable: false,
      mockResponse: "",
    },
    quiz: [
      {
        id: "th-1",
        question: "What is the main difference between throttling and rate limiting?",
        options: [
          "Throttling is for servers, rate limiting for clients",
          "Throttling delays requests; rate limiting rejects them",
          "Rate limiting is faster than throttling",
          "There is no difference",
        ],
        correctIndex: 1,
        explanation:
          "Throttling delays or queues requests, while rate limiting rejects requests that exceed the limit. Throttling is gentler.",
      },
      {
        id: "th-2",
        question: "When should you use debounce vs throttle?",
        options: [
          "Debounce for periodic events, throttle for delayed ones",
          "Debounce after user stops acting, throttle for max frequency",
          "They are interchangeable",
          "Only throttle exists in JavaScript",
        ],
        correctIndex: 1,
        explanation:
          "Use debounce when you want to wait until the user stops (e.g., search input). Use throttle when you want to limit how often something fires (e.g., scroll events).",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Clients", description: "Many concurrent requests", type: "client" },
      { id: "throttle", label: "Throttle Layer", description: "Queues excess requests", type: "gateway" },
      { id: "queue", label: "Queue", description: "Processes at controlled rate", type: "token" },
      { id: "server", label: "Server", description: "Handles manageable load", type: "server" },
    ],
  },
  {
    id: "11",
    slug: "pagination",
    title: "Pagination",
    shortDescription: "Split data into pages.",
    category: "performance",
    icon: "📄",
    color: "cyan",
    explanation:
      "Pagination splits large datasets into smaller chunks (pages) to improve API performance and user experience. Three main strategies are: offset pagination (page/limit), cursor pagination (for large datasets), and keyset pagination.",
    keyPoints: [
      "Offset: ?page=2&limit=20 — simple but has deep pagination issues",
      "Cursor: ?after=cursor_id — efficient for large, changing datasets",
      "Always include total count and navigation links",
      "Default to reasonable page sizes (10-50 items)",
    ],
    codeExample: {
      language: "javascript",
      title: "Pagination Strategies",
      description: "Offset and cursor-based pagination examples",
      code: `// OFFSET PAGINATION (simple, page-based)
GET /api/posts?page=3&limit=20

// Response
{
  "data": [...20 posts...],
  "pagination": {
    "page": 3,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}

// CURSOR PAGINATION (efficient for large datasets)
GET /api/posts?after=eyJpZCI6MTAwfQ==&limit=20

// Response
{
  "data": [...20 posts...],
  "pagination": {
    "cursor": "eyJpZCI6MTIwfQ==",  // next cursor
    "hasNextPage": true,
    "hasPreviousPage": true
  }
}

// Client-side infinite scroll with cursor
async function loadMorePosts(cursor) {
  const url = cursor
    ? \`/api/posts?after=\${cursor}&limit=20\`
    : '/api/posts?limit=20';

  const { data, pagination } = await fetch(url).then(r => r.json());
  return { posts: data, nextCursor: pagination.cursor };
}`,
      runnable: true,
      mockResponse: `{
  "data": [
    { "id": 41, "title": "Post 41", "author": "Alice" },
    { "id": 42, "title": "Post 42", "author": "Bob" }
  ],
  "pagination": {
    "page": 3, "limit": 20, "total": 150,
    "totalPages": 8, "hasNext": true
  }
}`,
    },
    quiz: [
      {
        id: "pg-1",
        question: "What is the main disadvantage of offset pagination?",
        options: [
          "It's too complex to implement",
          "Items can be missed/duplicated when data changes during pagination",
          "It requires a database",
          "It only works for small datasets",
        ],
        correctIndex: 1,
        explanation:
          "Offset pagination has issues when the dataset changes between requests — new items can cause items to be skipped or duplicated. Cursor pagination solves this.",
      },
      {
        id: "pg-2",
        question: "Which pagination type is best for large, real-time datasets?",
        options: [
          "Offset pagination",
          "Page-number pagination",
          "Cursor-based pagination",
          "Sequential pagination",
        ],
        correctIndex: 2,
        explanation:
          "Cursor-based pagination is more efficient for large datasets and handles real-time data changes correctly, unlike offset pagination.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Requests page/cursor", type: "client" },
      { id: "api", label: "API", description: "Applies limit+offset", type: "server" },
      { id: "db", label: "Database", description: "Queries subset", type: "database" },
      { id: "response", label: "Response", description: "Data + next cursor", type: "arrow" },
    ],
  },
  {
    id: "12",
    slug: "caching",
    title: "Caching",
    shortDescription: "Store data for speed.",
    category: "performance",
    icon: "⚡",
    color: "yellow",
    explanation:
      "Caching stores frequently accessed data in a fast storage layer to reduce database load and API latency. HTTP caching uses headers like Cache-Control and ETag, while server-side caching uses Redis, Memcached, or in-memory stores.",
    keyPoints: [
      "Cache-Control: max-age=3600 means cache for 1 hour",
      "ETag: fingerprint for content — enables conditional requests",
      "304 Not Modified: use cached version",
      "Cache invalidation is one of the hardest problems in CS",
    ],
    codeExample: {
      language: "javascript",
      title: "HTTP Caching Headers",
      description: "Setting up effective caching with HTTP headers",
      code: `// Server response with cache headers
app.get('/api/products', (req, res) => {
  const products = getProducts();
  const etag = generateETag(products);

  // Check if client has current version
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).send(); // Not Modified — use cache
  }

  res.set({
    'Cache-Control': 'public, max-age=3600',  // Cache 1 hour
    'ETag': etag,
    'Last-Modified': new Date().toUTCString(),
    'Vary': 'Accept-Encoding'
  });

  res.json(products);
});

// Client-side with Redis cache (Node.js)
const redis = require('redis');

async function getWithCache(key, fetchFn, ttl = 3600) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}

// Usage
const user = await getWithCache(
  \`user:\${userId}\`,
  () => db.users.findById(userId),
  300 // 5 minutes TTL
);`,
      runnable: true,
      mockResponse: `HTTP/1.1 304 Not Modified
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
// (no body — use cached response)`,
    },
    quiz: [
      {
        id: "cache-1",
        question: "What does 'Cache-Control: max-age=3600' mean?",
        options: [
          "Cache up to 3600 items",
          "Cache expires in 3600 minutes",
          "Cache is valid for 3600 seconds (1 hour)",
          "Cache only 36% of responses",
        ],
        correctIndex: 2,
        explanation:
          "max-age=3600 means the cached response is valid for 3600 seconds (1 hour). After that, the client should revalidate.",
      },
      {
        id: "cache-2",
        question: "What HTTP status code means 'your cached version is still valid'?",
        options: ["200", "204", "304", "404"],
        correctIndex: 2,
        explanation:
          "304 Not Modified tells the client that the cached version is still current — no need to re-download the response body.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Requests resource", type: "client" },
      { id: "cache", label: "Cache Layer", description: "Checks if cached", type: "gateway" },
      { id: "hit", label: "Cache Hit/Miss", description: "Returns or fetches", type: "token" },
      { id: "origin", label: "Origin Server", description: "Only on cache miss", type: "server" },
    ],
  },
  {
    id: "13",
    slug: "idempotency",
    title: "Idempotency",
    shortDescription: "Same result every time.",
    category: "fundamentals",
    icon: "♾️",
    color: "green",
    explanation:
      "An operation is idempotent if making the same request multiple times produces the same result. This is crucial for safe retries in distributed systems. GET, PUT, and DELETE are idempotent; POST is not (it creates a new resource each time).",
    keyPoints: [
      "GET, PUT, DELETE are idempotent by design",
      "POST is NOT idempotent — creates a new resource each call",
      "Use idempotency keys for non-idempotent operations",
      "Essential for safe retries in payment systems",
    ],
    codeExample: {
      language: "javascript",
      title: "Idempotency Keys for Safe Retries",
      description: "Preventing duplicate transactions with idempotency keys",
      code: `// Problem: POST /payments might be called multiple times on network error
// Solution: Idempotency keys

// Generate a unique key for each intended operation
const idempotencyKey = crypto.randomUUID(); // e.g., "550e8400-e29b-41d4-a716-446655440000"

// Include key in request
const payment = await fetch('/api/payments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': idempotencyKey  // Server deduplicates by this key
  },
  body: JSON.stringify({
    amount: 9999,
    currency: 'USD',
    customerId: 'cust_123'
  })
});

// Server-side: Check if key was already processed
async function createPayment(req, res) {
  const idempotencyKey = req.headers['idempotency-key'];

  // Check if we've seen this key before
  const existing = await db.idempotencyKeys.find(idempotencyKey);
  if (existing) {
    return res.json(existing.result); // Return cached result
  }

  // Process payment
  const result = await processPayment(req.body);

  // Store result with key (expires in 24h)
  await db.idempotencyKeys.save(idempotencyKey, result, { ttl: 86400 });

  return res.status(201).json(result);
}`,
      runnable: true,
      mockResponse: `// Second call with same idempotency key
{
  "paymentId": "pay_xyz123",
  "status": "succeeded",
  "amount": 9999,
  "idempotent": true  // Indicates this was a duplicate request
}`,
    },
    quiz: [
      {
        id: "ide-1",
        question: "Which HTTP method is NOT idempotent?",
        options: ["GET", "PUT", "DELETE", "POST"],
        correctIndex: 3,
        explanation:
          "POST is not idempotent because calling it multiple times typically creates multiple resources. GET, PUT, and DELETE produce the same result regardless of how many times they're called.",
      },
      {
        id: "ide-2",
        question: "What is an idempotency key used for?",
        options: [
          "Encrypting API responses",
          "Safely retrying non-idempotent operations without duplicates",
          "Sorting API results",
          "Paginating large responses",
        ],
        correctIndex: 1,
        explanation:
          "Idempotency keys allow clients to safely retry requests (like payments) without creating duplicates. The server recognizes the key and returns the same result.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Sends with key", type: "client" },
      { id: "server", label: "Server", description: "Checks key store", type: "server" },
      { id: "store", label: "Key Store", description: "Already processed?", type: "database" },
      { id: "result", label: "Result", description: "Same result returned", type: "arrow" },
    ],
  },
  {
    id: "14",
    slug: "webhooks",
    title: "Webhooks",
    shortDescription: "Server notifies your system.",
    category: "architecture",
    icon: "🪝",
    color: "pink",
    explanation:
      "Webhooks are reverse APIs — instead of your app polling for changes, the external service sends HTTP POST requests to your URL when events occur. They enable real-time event-driven architectures without constant polling.",
    keyPoints: [
      "Push model: server calls your endpoint when events happen",
      "More efficient than polling for event-driven use cases",
      "Always verify webhook signatures for security",
      "Return 200 quickly; process async to avoid timeouts",
    ],
    codeExample: {
      language: "javascript",
      title: "Receiving and Verifying Webhooks",
      description: "Secure webhook endpoint with signature verification",
      code: `// Your webhook endpoint
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // IMPORTANT: Verify signature to prevent spoofing
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // Respond immediately (within 30s timeout)
  res.status(200).json({ received: true });

  // Process event asynchronously
  setImmediate(async () => {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await fulfillOrder(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await cancelSubscription(event.data.object.customer);
        break;
      case 'invoice.payment_failed':
        await notifyUser(event.data.object.customer_email);
        break;
    }
  });
});`,
      runnable: false,
      mockResponse: "",
    },
    quiz: [
      {
        id: "wh-1",
        question: "How are webhooks different from regular API calls?",
        options: [
          "Webhooks use a different HTTP method",
          "The server calls your endpoint, not the other way around",
          "Webhooks require authentication",
          "Webhooks are faster than API calls",
        ],
        correctIndex: 1,
        explanation:
          "With webhooks, the external service calls your endpoint when an event occurs (push model). Regular APIs use a request-response model where you call them (pull model).",
      },
      {
        id: "wh-2",
        question: "Why should you always verify webhook signatures?",
        options: [
          "To speed up processing",
          "To prevent spoofed/fake webhook calls from attackers",
          "To enable retry logic",
          "To compress the payload",
        ],
        correctIndex: 1,
        explanation:
          "Without signature verification, anyone could send fake webhook payloads to your endpoint. The signature (HMAC) proves the payload came from the legitimate source.",
      },
    ],
    diagramSteps: [
      { id: "event", label: "Event Occurs", description: "e.g., payment received", type: "server" },
      { id: "service", label: "External Service", description: "Prepares notification", type: "gateway" },
      { id: "webhook", label: "HTTP POST", description: "Sends to your URL", type: "arrow" },
      { id: "handler", label: "Your Endpoint", description: "Processes event", type: "client" },
    ],
  },
  {
    id: "15",
    slug: "api-versioning",
    title: "API Versioning",
    shortDescription: "Manage evolving API changes.",
    category: "architecture",
    icon: "📦",
    color: "violet",
    explanation:
      "API versioning allows you to make breaking changes to your API without disrupting existing clients. Common strategies include URL versioning (/v1/, /v2/), header versioning, and query parameter versioning.",
    keyPoints: [
      "Breaking changes require a new version",
      "URL versioning: /api/v1/users — most common and visible",
      "Header versioning: Accept: application/vnd.api+json;version=2",
      "Deprecate old versions with sunset headers",
    ],
    codeExample: {
      language: "javascript",
      title: "API Versioning Strategies",
      description: "Different approaches to versioning your API",
      code: `// Strategy 1: URL versioning (most common)
GET /api/v1/users     // v1 response format
GET /api/v2/users     // v2 response format (breaking changes OK)

// Strategy 2: Header versioning
GET /api/users
Accept: application/vnd.myapi.v2+json

// Strategy 3: Query parameter
GET /api/users?version=2

// Versioning in Express.js
const express = require('express');
const app = express();

// V1 routes
const v1Router = express.Router();
v1Router.get('/users', (req, res) => {
  res.json({ users: getUsersV1() });
});

// V2 routes (breaking change: users → data, added meta)
const v2Router = express.Router();
v2Router.get('/users', (req, res) => {
  res.json({
    data: getUsersV2(),   // renamed field
    meta: { total: 100 } // new field
  });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Deprecation headers
v1Router.use((req, res, next) => {
  res.set('Sunset', 'Sat, 1 Jan 2025 00:00:00 GMT');
  res.set('Deprecation', 'true');
  next();
});`,
      runnable: true,
      mockResponse: `// V1 response
{ "users": [{ "id": 1, "name": "Alice" }] }

// V2 response (breaking change)
{
  "data": [{ "id": 1, "name": "Alice", "email": "alice@example.com" }],
  "meta": { "total": 1, "version": "2.0" }
}`,
    },
    quiz: [
      {
        id: "ver-1",
        question: "When should you create a new API version?",
        options: [
          "For every change, no matter how small",
          "Only for bug fixes",
          "When making breaking changes that affect existing clients",
          "Every year automatically",
        ],
        correctIndex: 2,
        explanation:
          "New versions are needed for breaking changes (removing fields, changing types, changing behavior). Non-breaking changes (adding optional fields) don't require a new version.",
      },
      {
        id: "ver-2",
        question: "Which versioning strategy is most visible and commonly used?",
        options: [
          "Query parameter versioning",
          "Header versioning",
          "URL path versioning (/v1/, /v2/)",
          "Cookie versioning",
        ],
        correctIndex: 2,
        explanation:
          "URL path versioning (e.g., /api/v1/) is the most common approach — it's visible, easy to use, and works with all HTTP clients without special headers.",
      },
    ],
    diagramSteps: [
      { id: "client1", label: "Old Client", description: "Uses /api/v1", type: "client" },
      { id: "client2", label: "New Client", description: "Uses /api/v2", type: "client" },
      { id: "router", label: "Version Router", description: "Routes by version", type: "gateway" },
      { id: "v1", label: "V1 Handler", description: "Old format", type: "server" },
    ],
  },
  {
    id: "16",
    slug: "openapi",
    title: "OpenAPI",
    shortDescription: "Standardized API documentation format.",
    category: "documentation",
    icon: "📋",
    color: "blue",
    explanation:
      "OpenAPI (formerly Swagger) is the industry standard for documenting REST APIs. An OpenAPI specification is a machine-readable YAML/JSON file describing all endpoints, parameters, request/response schemas, and authentication. Tools can auto-generate docs, clients, and tests from it.",
    keyPoints: [
      "OpenAPI 3.0 is the current standard",
      "Documents endpoints, schemas, auth, and examples",
      "Tools: Swagger UI, Redoc, Postman, code generators",
      "Contract-first API development improves collaboration",
    ],
    codeExample: {
      language: "yaml",
      title: "OpenAPI 3.0 Specification",
      description: "Example OpenAPI spec for a User API",
      code: `openapi: 3.0.3
info:
  title: User API
  version: 1.0.0
  description: API for managing users

servers:
  - url: https://api.example.com/v1

paths:
  /users/{id}:
    get:
      summary: Get a user by ID
      operationId: getUserById
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
          format: email
      required: [id, name, email]
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT`,
      runnable: false,
      mockResponse: "",
    },
    quiz: [
      {
        id: "oa-1",
        question: "What is OpenAPI primarily used for?",
        options: [
          "Securing API endpoints",
          "Standardized API documentation and specification",
          "Hosting APIs in the cloud",
          "Testing API performance",
        ],
        correctIndex: 1,
        explanation:
          "OpenAPI provides a standard, machine-readable format for describing REST APIs. It enables automated documentation, client generation, and testing.",
      },
      {
        id: "oa-2",
        question: "What was OpenAPI previously called?",
        options: ["REST API Spec", "Swagger", "RAML", "API Blueprint"],
        correctIndex: 1,
        explanation:
          "OpenAPI was originally called Swagger. The specification was donated to the Linux Foundation and renamed OpenAPI Specification (OAS) in 2016.",
      },
    ],
    diagramSteps: [
      { id: "spec", label: "OpenAPI Spec", description: "YAML/JSON file", type: "token" },
      { id: "docs", label: "Swagger UI", description: "Interactive docs", type: "client" },
      { id: "sdk", label: "SDK Generator", description: "Auto-generates clients", type: "gateway" },
      { id: "tests", label: "Test Suite", description: "Contract testing", type: "server" },
    ],
  },
  {
    id: "17",
    slug: "rest-vs-graphql",
    title: "REST vs GraphQL",
    shortDescription: "Different API query approaches.",
    category: "architecture",
    icon: "⚖️",
    color: "orange",
    explanation:
      "REST uses multiple endpoints each returning fixed data structures. GraphQL uses a single endpoint where clients specify exactly what data they need. GraphQL eliminates over-fetching and under-fetching but adds complexity.",
    keyPoints: [
      "REST: multiple endpoints, fixed responses, HTTP caching built-in",
      "GraphQL: single endpoint, flexible queries, precise data fetching",
      "GraphQL solves over-fetching and under-fetching",
      "REST is simpler; GraphQL shines with complex, interconnected data",
    ],
    codeExample: {
      language: "javascript",
      title: "REST vs GraphQL Comparison",
      description: "Fetching user + posts in REST vs GraphQL",
      code: `// ===== REST APPROACH =====
// Problem: Need 3 separate requests (under-fetching)
const user = await fetch('/api/users/1');
const posts = await fetch('/api/users/1/posts');
const comments = await fetch('/api/users/1/comments');

// OR: Over-fetching — get full objects when you only need names
const allUsers = await fetch('/api/users');
// Returns: id, name, email, avatar, phone, address, bio, ...
// You only needed: id, name


// ===== GRAPHQL APPROACH =====
// Single request, get exactly what you need
const query = \`
  query GetUserData($userId: ID!) {
    user(id: $userId) {
      id
      name              # only fields you need
      posts(last: 5) {  # nested resource
        title
        createdAt
      }
    }
  }
\`;

const { data } = await fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables: { userId: "1" } })
}).then(r => r.json());`,
      runnable: true,
      mockResponse: `// GraphQL response
{
  "data": {
    "user": {
      "id": "1",
      "name": "Alice",
      "posts": [
        { "title": "GraphQL is Great", "createdAt": "2024-01-10" },
        { "title": "REST vs GraphQL", "createdAt": "2024-01-08" }
      ]
    }
  }
}`,
    },
    quiz: [
      {
        id: "rg-1",
        question: "What problem does GraphQL solve that REST has?",
        options: [
          "Authentication issues",
          "Over-fetching and under-fetching data",
          "Slow database queries",
          "Missing documentation",
        ],
        correctIndex: 1,
        explanation:
          "GraphQL allows clients to request exactly the data they need, solving over-fetching (getting too much data) and under-fetching (needing multiple requests for related data).",
      },
      {
        id: "rg-2",
        question: "How many endpoints does a typical GraphQL API have?",
        options: ["One per resource", "Two (query and mutation)", "One single endpoint", "Unlimited"],
        correctIndex: 2,
        explanation:
          "GraphQL typically uses a single endpoint (e.g., /graphql) that handles all queries and mutations, unlike REST which uses multiple endpoints.",
      },
    ],
    diagramSteps: [
      { id: "client", label: "Client", description: "Defines query", type: "client" },
      { id: "endpoint", label: "/graphql", description: "Single endpoint", type: "gateway" },
      { id: "resolver", label: "Resolvers", description: "Fetches exact fields", type: "server" },
      { id: "db", label: "Data Sources", description: "Returns precise data", type: "database" },
    ],
  },
  {
    id: "18",
    slug: "api-gateway",
    title: "API Gateway",
    shortDescription: "Single entry for services.",
    category: "architecture",
    icon: "🚪",
    color: "slate",
    explanation:
      "An API Gateway is a single entry point for all client requests, routing them to appropriate microservices. It handles cross-cutting concerns like authentication, rate limiting, logging, SSL termination, and request transformation.",
    keyPoints: [
      "Single entry point for all API traffic",
      "Handles auth, rate limiting, logging centrally",
      "Can aggregate multiple microservice responses",
      "Examples: AWS API Gateway, Kong, nginx, Traefik",
    ],
    codeExample: {
      language: "javascript",
      title: "API Gateway Pattern",
      description: "Gateway routing and aggregation example",
      code: `// Simple API Gateway with Express
const express = require('express');
const httpProxy = require('http-proxy-middleware');

const gateway = express();

// Centralized middleware for all routes
gateway.use(authenticate);      // Auth for all services
gateway.use(rateLimiter);       // Rate limit all requests
gateway.use(requestLogger);     // Log everything

// Route to different microservices
gateway.use('/api/users', httpProxy.createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' }
}));

gateway.use('/api/orders', httpProxy.createProxyMiddleware({
  target: 'http://order-service:3002',
  changeOrigin: true
}));

gateway.use('/api/products', httpProxy.createProxyMiddleware({
  target: 'http://product-service:3003',
  changeOrigin: true
}));

// Aggregation: combine multiple services in one response
gateway.get('/api/dashboard', async (req, res) => {
  const [user, orders, notifications] = await Promise.all([
    fetch('http://user-service:3001/profile'),
    fetch('http://order-service:3002/recent'),
    fetch('http://notification-service:3004/unread')
  ]);

  res.json({
    user: await user.json(),
    orders: await orders.json(),
    notifications: await notifications.json()
  });
});

gateway.listen(80);`,
      runnable: false,
      mockResponse: "",
    },
    quiz: [
      {
        id: "ag-1",
        question: "What is the main benefit of an API Gateway?",
        options: [
          "Makes APIs faster",
          "Provides a single entry point handling cross-cutting concerns",
          "Replaces databases",
          "Encrypts all data",
        ],
        correctIndex: 1,
        explanation:
          "An API Gateway provides a centralized point to handle auth, rate limiting, logging, and routing — avoiding repetition of these concerns in every microservice.",
      },
      {
        id: "ag-2",
        question: "Which is NOT typically a function of an API Gateway?",
        options: [
          "Authentication",
          "Rate limiting",
          "Data storage",
          "Request routing",
        ],
        correctIndex: 2,
        explanation:
          "API Gateways handle routing, auth, rate limiting, and logging. Data storage is the job of databases, not gateways.",
      },
    ],
    diagramSteps: [
      { id: "clients", label: "Clients", description: "Web, mobile, IoT", type: "client" },
      { id: "gateway", label: "API Gateway", description: "Auth, rate limit, route", type: "gateway" },
      { id: "svc1", label: "User Service", description: "Handles users", type: "server" },
      { id: "svc2", label: "Order Service", description: "Handles orders", type: "server" },
    ],
  },
  {
    id: "19",
    slug: "microservices",
    title: "Microservices",
    shortDescription: "Small independent service components.",
    category: "architecture",
    icon: "🧩",
    color: "emerald",
    explanation:
      "Microservices architecture decomposes an application into small, independently deployable services that communicate via APIs. Each service owns its own data and can be developed, deployed, and scaled independently.",
    keyPoints: [
      "Each service is small, focused, and independently deployable",
      "Services communicate via REST, gRPC, or message queues",
      "Each service has its own database",
      "Trade-off: distributed systems complexity vs scalability",
    ],
    codeExample: {
      language: "javascript",
      title: "Microservice Communication",
      description: "Services communicating via REST and events",
      code: `// User Service (port 3001)
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);

  // Publish event for other services
  await messageQueue.publish('user.created', {
    userId: user.id,
    email: user.email
  });

  res.status(201).json(user);
});

// Email Service — subscribes to user events
messageQueue.subscribe('user.created', async (event) => {
  await sendWelcomeEmail(event.email);
});

// Order Service — calls User Service directly
app.post('/orders', async (req, res) => {
  // Synchronous REST call to User Service
  const user = await fetch(\`http://user-service/users/\${req.userId}\`)
    .then(r => r.json());

  if (!user) throw new Error('User not found');

  const order = await Order.create({
    ...req.body,
    userId: user.id
  });

  res.status(201).json(order);
});

// Health check endpoint (every microservice should have this)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'order-service', uptime: process.uptime() });
});`,
      runnable: false,
      mockResponse: "",
    },
    quiz: [
      {
        id: "ms-1",
        question: "In microservices, should services share a database?",
        options: [
          "Yes, a shared database is more efficient",
          "No, each service should own its own database",
          "Only for read operations",
          "Only the auth service needs its own DB",
        ],
        correctIndex: 1,
        explanation:
          "Each microservice should own its data independently. Sharing a database creates tight coupling between services, defeating the purpose of microservices.",
      },
      {
        id: "ms-2",
        question: "What is a key trade-off of microservices vs monolith?",
        options: [
          "Microservices are always simpler",
          "Monoliths can't scale",
          "Microservices add distributed systems complexity",
          "Monoliths require more infrastructure",
        ],
        correctIndex: 2,
        explanation:
          "Microservices enable independent scaling and deployment, but introduce distributed systems complexity: network failures, data consistency, service discovery, and distributed tracing.",
      },
    ],
    diagramSteps: [
      { id: "gateway", label: "API Gateway", description: "Routes requests", type: "gateway" },
      { id: "users", label: "User Service", description: "Manages users", type: "server" },
      { id: "orders", label: "Order Service", description: "Manages orders", type: "server" },
      { id: "events", label: "Message Bus", description: "Async events", type: "token" },
    ],
  },
  {
    id: "20",
    slug: "error-handling",
    title: "Error Handling",
    shortDescription: "Consistent responses for failures.",
    category: "fundamentals",
    icon: "🚨",
    color: "red",
    explanation:
      "Good API error handling means returning consistent, informative error responses that help developers understand and fix issues. Use appropriate HTTP status codes, machine-readable error codes, and human-readable messages.",
    keyPoints: [
      "Use correct HTTP status codes (4xx for client, 5xx for server)",
      "Include error code, message, and optional details",
      "Never expose stack traces or internal details in production",
      "Log errors with context (request ID, user ID, timestamp)",
    ],
    codeExample: {
      language: "javascript",
      title: "Consistent Error Response Format",
      description: "Standardized error handling in Express.js",
      code: `// Standard error response format
const createError = (status, code, message, details = null) => ({
  error: {
    status,
    code,            // Machine-readable
    message,         // Human-readable
    details,         // Additional context (optional)
    timestamp: new Date().toISOString(),
    requestId: req.id
  }
});

// Example error responses
// 400 Bad Request
res.status(400).json(createError(400,
  'VALIDATION_ERROR',
  'Invalid email format',
  { field: 'email', value: 'not-an-email' }
));

// 401 Unauthorized
res.status(401).json(createError(401,
  'INVALID_TOKEN',
  'Access token is expired'
));

// 404 Not Found
res.status(404).json(createError(404,
  'RESOURCE_NOT_FOUND',
  'User with ID 999 not found'
));

// 429 Rate Limited
res.status(429).json(createError(429,
  'RATE_LIMIT_EXCEEDED',
  'Too many requests',
  { retryAfter: 120, limit: 100 }
));

// Global error handler middleware
app.use((err, req, res, next) => {
  // Log for debugging (never expose in response)
  logger.error({ err, requestId: req.id, userId: req.user?.id });

  res.status(err.status || 500).json(createError(
    err.status || 500,
    err.code || 'INTERNAL_ERROR',
    process.env.NODE_ENV === 'production'
      ? 'An error occurred'
      : err.message
  ));
});`,
      runnable: true,
      mockResponse: `{
  "error": {
    "status": 422,
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "age", "message": "Must be a positive integer" }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}`,
    },
    quiz: [
      {
        id: "eh-1",
        question: "What should you include in an API error response?",
        options: [
          "Full stack trace for debugging",
          "Database query that failed",
          "Machine-readable code + human-readable message",
          "Only the HTTP status code",
        ],
        correctIndex: 2,
        explanation:
          "Good error responses include a machine-readable error code (for programmatic handling) and a human-readable message. Never expose stack traces in production.",
      },
      {
        id: "eh-2",
        question: "Where should you log detailed error information?",
        options: [
          "In the API response body",
          "In server-side logs only",
          "In the URL query parameters",
          "In client-side cookies",
        ],
        correctIndex: 1,
        explanation:
          "Detailed error info (stack traces, internal state) should only go in server-side logs. API responses should only contain safe, helpful error information.",
      },
    ],
    diagramSteps: [
      { id: "request", label: "Request", description: "Client sends request", type: "client" },
      { id: "validate", label: "Validation", description: "Check input/auth", type: "gateway" },
      { id: "error", label: "Error Handler", description: "Formats error", type: "server" },
      { id: "response", label: "Error Response", description: "Status + code + message", type: "arrow" },
    ],
  },
];

export const getConcept = (slug: string): Concept | undefined =>
  concepts.find((c) => c.slug === slug);

export const getConceptsByCategory = (category: string) =>
  concepts.filter((c) => c.category === category);

export const categoryColors: Record<string, string> = {
  fundamentals: "blue",
  security: "purple",
  performance: "green",
  architecture: "orange",
  documentation: "cyan",
};

export const categoryLabels: Record<string, string> = {
  fundamentals: "Fundamentals",
  security: "Security",
  performance: "Performance",
  architecture: "Architecture",
  documentation: "Documentation",
};
