namespace game{
    export let photo:string="test/photo.png";
    export let name:string="xx";
    /**腾讯统计 */
    export function statistical(id:string){
        try {
            MtaH5.clickStat("home_start");
        } catch (e) {

        }
        
    }
}