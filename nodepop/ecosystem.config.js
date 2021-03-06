module.exports = {
  apps : [{
    script: './bin/www',
    watch: '.'
  }, {
    script: './service/serviceThumbnail.js',
    watch: ['./service/serviceThumbnail.js']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
