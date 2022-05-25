<script>
    export let player;

    const getJSON = (player) => {
        return player && {
            alive: player.alive,
            animWait: player.animWait,
            dash: player.dash,
            dashCooldown: player.dashCooldown,
            flipped: player.flipped,
            jumpCount: player.jumpCount,
            jumping: player.jumping,
            moveDirection: player.moveDirection,
            name: player.name,
            scale: player.scale,
        }
    }
</script>

<div>Alive: {player.alive || ''}</div>
<div>Dash: {player.alive || ''}</div>
<div>scale: {player.scale || '1'}</div>
<div>moveDirection: {player.moveDirection || ''}</div>
<div>jumping: {player.jumping || ''}</div>
<div>jumpCount: {player.jumpCount || ''}</div>
<div>flipped: {player.flipped || ''}</div>
<pre><code>
    {JSON.stringify(getJSON(player))}
</code></pre>