export default class Mathf {
    
    public static clamp(n: number, min: number, max: number) {
        return Math.max(min, Math.min(n, max))
    }

}
