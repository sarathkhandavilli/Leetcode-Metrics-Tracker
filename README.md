# LeetCode Metrics Tracker

A web application that displays LeetCode user statistics and progress.

## Features
- View LeetCode user statistics
- Track progress across different difficulty levels
- Display submission counts
- Real-time data fetching

## Project Structure
- `index.html` - Main HTML file
- `style.css` - Styling
- `script.js` - Frontend JavaScript
- `cors-server.js` - CORS proxy server
- `package.json` - Project dependencies
- `netlify.toml` - Netlify configuration

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the CORS proxy server:
```bash
npm start
```

3. Open `index.html` in your browser

## Deployment

### Frontend (Netlify)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: leave empty
   - Publish directory: `/`
4. Deploy site

### Backend (Render.com)
1. Create a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Build Command: `npm install`
   - Start Command: `node cors-server.js`
5. Copy the deployed URL and update it in `script.js`

## Maintenance

### Regular Updates
1. Keep dependencies updated:
```bash
npm update
```

2. Check for security vulnerabilities:
```bash
npm audit
```

### Monitoring
- Monitor the Netlify dashboard for frontend status
- Monitor the Render.com dashboard for backend status
- Check deployment logs in both platforms
- Monitor error logs in Render.com

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License 