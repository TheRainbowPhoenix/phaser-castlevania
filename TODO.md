# TODO
Notes for the later me

## Animation

Debounce animator : fade between anims


Properly handle states in player for animations :

- Hop (falling and touching the ground)
- Drop (falling on air)
- Death (HP 0)
- IDLE (Standing on platform)
- Jump_Up (single jump)
- Jump_Up_Double (double jump)
- Move (walking right)
- Flip (animations when going left, fix the hitbox too !!)

## Animations - Mermaiden way :

### Move 
idle (standing)
walk anim (run)
waiting (half-standing) ~5s (5 animation cycle)
anim waitToIDLE (~4 frames, 0.2 s)
idle (standing, loop)

### trap
walk anim (run, stoped instant)
binding pose (player), binding animation open (jumping cables), light flare
Camera center to player with easing move, and zoom
Struggle bar + struggle player animation + small hearth text

[if bar < 0]
wait for the animation to end, screen "impulsion" effect, stage 2 animation, reset struggle bar

[if bar < 0]
wait for the animation to end, screen "impulsion" effect, stage 3 animation, reset struggle bar


[on Struggle break]
waiting (half-standing), binding break animation 
Player jump animation (?)

### Jump
Jumping animation (seems fluid)
drop animation (almost no move)
[on floor touch]
waiting (half-standing)

### Double jump
Jumping animation (fluid)
Backflip
[on floor touch]
waiting (half-standing)

### Falling
drop animation (almost no move)
[on floor touch]
waiting (half-standing)

(camera have a little delay)

### Hurt
hurt animation (on place)

### Attack
attack animation (small move)
waiting



## Events
Make a proper way of sending and catching events

## Graphics
Put some background and floor ...

## UI
Do something cool please, but not important for now
