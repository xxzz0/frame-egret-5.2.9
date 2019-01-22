var game;
(function (game) {
    game.photo = "test/photo.png";
    game.name = "xx";
    /**腾讯统计 */
    function statistical(id) {
        try {
            MtaH5.clickStat("home_start");
        }
        catch (e) {
        }
    }
    game.statistical = statistical;
})(game || (game = {}));
//# sourceMappingURL=game.js.map