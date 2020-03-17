module.exports = {
  presets: [ 
    [
      "@babel/preset-env", {
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-property-literals",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-object-assign"
  ]
}