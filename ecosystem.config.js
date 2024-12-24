module.exports = {
  apps: [
    {
      name: "text_gate:watch",
      script: "sh",
      args: "-c 'yarn dev:watch'",
      restart_delay: 5000 // Задержка перед перезапуском
    },
    {
      name: "text_gate",
      script: "sh",
      args: "-c 'yarn dev'",
      restart_delay: 5000
    }
  ]
};
