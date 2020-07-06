express = require('express')
var db = require('./models')
var app = express()

// db.favoritesSpaceX.create({
//     userId: 1,
//     favoritesListSpaceX: ["5ed9819a1f30554030d45c29", "5eb87d50ffd86e000604b394"]
// })
// .then(function(favoriteSpaceX) {
//     console.log(favoritesSpaceX)
// })


// db.favoritesSpaceX.findOne({
//     where: {id:1}
// })
// .then(function(favoriteSpaceX) {
//     console.log(favoriteSpaceX)
// })

// db.favoritesImages.create({
//     userId:1,
//     favoritesListImages: ["http://images-assets.nasa.gov/image/PIA09720/PIA09720~orig.jpg", "http://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000929/GSFC_20171208_Archive_e000929~orig.jpg"]
// })
// .then(function(favoriteImages) {
//     console.log(favoriteImages)
// })

// db.favoritesImages.update({ favoritesListImages: ["http://images-assets.nasa.gov/image/PIA09720/PIA09720~orig.jpg", "http://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000929/GSFC_20171208_Archive_e000929~orig.jpg"] }, { where: { id: 1 } }).then(function (favoriteImages) {
//     console.log(favoriteImages)
// })

// db.favoritesNews.create({
//     userId:1,
//     favoritesListNews: ["https://www.reddit.com/r/spacex/comments/h8mold/starlink9_launch_campaign_thread/", "https://www.teslarati.com/rocket-lab-spacex-like-rapid-launch-july-4-electron-mission/"]
// })
// .then(function(favoriteNews) {
//     console.log(favoriteNews)
// })

// db.favoritesNews.update({ favoritesListNews: ["https://www.reddit.com/r/spacex/comments/h8mold/starlink9_launch_campaign_thread/", "https://www.teslarati.com/rocket-lab-spacex-like-rapid-launch-july-4-electron-mission/"]}, {where: {id:1}} )
// .then(function(favoriteNews) {
//     console.log(favoriteNews)
// })

db.favoritesReddits.create({
    userId:1,
    favoritesListReddits: ["https://www.theverge.com/2020/5/30/21269703/spacex-launch-crew-dragon-nasa-orbit-successful", "https://www.reddit.com/r/space/comments/gtzu3r/spacexs_crew_dragon_have_successfully_docked_into/"]
}).then(favoriteReddits => {
    console.log(favoriteReddits)
})