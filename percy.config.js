module.exports = {
  version: 2,
  discovery: {
    networkIdleTimeout: 750,
  },
  snapshot: {
    widths: [375, 1200], // Mobile first, then desktop
    minHeight: 1024,
    percyCSS: '',
    browsers: ['chrome'],
  },
  percy: {
    env: {
      NEXT_PUBLIC_APP_ENV: 'test',
    },
  },
}
