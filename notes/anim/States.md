# Base player FSM

## Clear level
clearT : transformed
clearT => exitT => noMesh

clear => exit => noMesh

## Kneeing
goingKneeU => kneeU

goingKneeT => kneeT


## Base
idle_Tfront_1


# Game Start

Health = 200
charge = 100
EConsume = 0.25

notAllowRubberSelf = false;

healthBar GameObject(HealthProgress)
ecsBar GameObject(EcsProgress)

healthPerc = health / 200;
ecsPerc = ecs / 200f;

traMesh, entMesh

if (transformed) animator.Play("hasumi@jump_T_2");
else animator.Play("hasumi@jump_2");

## States
bsMucus ==> mucusF.active, mucusB.active
bsTranceS => symbol.active
bsNorth => nSymbol.active
bsVisor => SetMeshVisor(true : false)
bsRubber => transformed = true, animator.SetBool("IsTransformed", true), animator.Play("hasumi@entryR");

# Update
```
aH, aV = getAxis()

if !gameManager.isPause && !gameManager.hasumiDead
    if aH > 0
        moveDirection = RIGHT
        attackDirection = RIGHT
    elif aH < 0
        moveDirection = LEFT
        attackDirection = LEFT
    else
        moveDirection = STOP
    
    if aV < 0
        if canJump
            animator["IsCrouching"] true
    else
        animator["IsCrouching"] false

if input.jump && !gameManager.isPause && !gameManager.hasumiDead  && !isTalking
    PushJumpButton()

if input.attack
    if onTopic
        collid.gameObject.get(TopicManager01).DisplayTextBox()
    
    elif onBaseEvent
        if !isTalking && !gameManager.isPause && !gameManager.hasumiDead
            switch eventNumber
                1:
                    // event specific code, bad idea
            animator["IsRunning"] = false

    elif !gameManager.isPause && !isTalking
        Attack(aV)

if input.resist && !gameManager.isPause && !gameManager.hasumiDead && !isTalking
    HasumiResist()

if input.trasnform && !gameManager.isPause && !gameManager.hasumiDead && !isTalking && canmove
    if transformed
        if canJump && gameManager.energy > 5
            GetReadyToFire()
    else
        HasumiTransform()

if input.item && !gameManager.isPause && !gameManager.hasumiDead
    subCanvasManager.SlotSelectAnimation1()
    switch gameManager.selectedItem:
        1:  UsePurifier()
        2:  UseMobileCharger()

if input.select && !gameManager.isPause && !gameManager.hasumiDead
    switch gameManager.selectedItem
        1:  gameManager.PlaySelectSE1()
            gameManager.selectedItem = 2
            subCanvasManager.ItemSlotSelect(2)

        2:  gameManager.PlaySelectSE1()
            gameManager.selectedItem = 1
            subCanvasManager.ItemSlotSelect(1)

if !canJumpCheck && canJump
    PlayLand1SE()
    canJumpCheck = true

if base.transform.localScale.x > 0f
    canJump = (bool)Physics2D.Linecast(base.transform.position - base.transform.right * 0.358f - base.transform.up * 1.3f, base.transform.position - base.transform.up * 1.4f - base.transform.right * 0.128f, roadLayer) || (bool)Physics2D.Linecast(base.transform.position - base.transform.right * -0.102f - base.transform.up * 1.3f, base.transform.position - base.transform.up * 1.4f - base.transform.right * 0.128f, roadLayer)
else
    canJump = (bool)Physics2D.Linecast(base.transform.position - base.transform.right * -0.358f - base.transform.up * 1.3f, base.transform.position - base.transform.up * 1.4f - base.transform.right * -0.128f, roadLayer) || (bool)Physics2D.Linecast(base.transform.position - base.transform.right * 0.102f - base.transform.up * 1.3f, base.transform.position - base.transform.up * 1.4f - base.transform.right * -0.128f, roadLayer)


if bsRubber && gameManager.ecsBar.fillAmount > 0.5f && !isTalking && !GameManager.isSceneGallery && !notAllowRubberSelf
    rubberTime += Time.deltaTime

    if rubberTime > 2.5f && !rubberTimeFlag1 && canJump
        rubberTimeFlag1 = true
        TakeHDamage(0f, 1f)
    
    if rubberTime > 4f && canJump
        rubberTimeFlag1 = true
        rubberTime = 0f
        GoRubberSelf()
```

# FixedUpdate
```
if animator["IsSliding"]
    moveDirection = NEUTRAL

    if Abs(rbody.velocity.x) < 2f
        if slideDirectionR
            rbody.velocity = (rbody.velocity.x + 1.5f, rbody.velocity.y - 2f);
        else
            rbody.velocity = (rbody.velocity.x - 1.5f, rbody.velocity.y - 2f);

    if canmove && !isTalking
        switch moveDirection
            STOP:   movespeed = 0
                    animator["IsRunning"] = false
                    rbody.velocity = (movespeed, rbody.velocity.y)
            
            RIGHT:  movespeed = 8
                    base.transform.localScale = (1f, 1f, 1f)
                    animator["IsRunning"] = true

                    if transformed
                        // Energy consume
                        if GameManager.hasumiEqSlot1 == 5 || GameManager.hasumiEqSlot2 == 5 || GameManager.hasumiEqSlot3 == 5 || GameManager.hasumiEqSlot4 == 5
                            gameManager.energy -= EConsume / 2f
                        else
                            gameManager.energy -= EConsume;

                    rbody.velocity = (movespeed, rbody.velocity.y)
            
            LEFT:   movespeed = -8
                    base.transform.localScale = (-1f, 1f, 1f) // Rotate player
                    animator["IsRunning"] = true

                    if transformed
                        // Energy consume ...
                    
                    rbody.velocity = (movespeed, rbody.velocity.y)
    
    if autoMove != 0
        switch autoMove
            RIGHT:      movespeed = 8
                        base.transform.localScale = (1f, 1f, 1f)
                        animator["IsRunning"] = true
            
            LEFT:       movespeed = -8
                        base.transform.localScale = (-1f, 1f, 1f) // Rotate player
                        animator["IsRunning"] = truev

            TURNRIGHT:  base.transform.localScale = (1f, 1f, 1f)
                        autoMove = STOP
            
            TURNLEFT:   base.transform.localScale = (-1f, 1f, 1f) // Rotate player
                        autoMove = STOP
            
            STOP:       movespeed = 0
                        animator["IsRunning"] = false
        
        rbody.velocity = (movespeed, rbody.velocity.y)
    
    if canJump
        cameraLevelY = base.transform.position.y
        animator["IsGrounded"] = true
        canJumpATK1 = true
    else
        animator["IsGrounded"] = false
        animator["IsCrouching"] = false
        canJumpCheck = false
        animator["IsSliding"] = false
    
    if isReverse
        if count > 0
            count -= Time.deltaTime
        else
            isReverse = false

```

# Attack
```
animStat = animator.GetCurrentAnimatorStateInfo(0)

if animator["IsSliding"]
    return

if !canJump
    if onAttack || animStat in [ jumpattack_2, jumpattack_2a, jumpattack_2b, jumpattack_T_2, jumpattack_T_2a, jumpattack_T_2b, damage1, damage1_T ]
        // on attack animation ?
        return
    
    if y < 0
        if animStat not in [ crouch, crouchT ]
            JumpAttack2()
    else
        JumpAttack1()
    
elif animStat not in [ attack_Tfront_5, attack_front_5 ]
    if animStat in [ attack_Tfront_4, attack_front_4 ]
        Attack5()
    elif animStat in [ attack_Tfront_3, attack_front_3 ]
        Attack4()
    elif animStat in [ attack_Tfront_2, attack_front_2 ]
        Attack3()
    elif animStat in [ attack_Tfront_1, attack_front_1 ]
        Attack2()
    else
        Attack1()

```

# PushJumpButton
```
animStat = animator.GetCurrentAnimatorStateInfo(0)

if !canJump || onAttack || !canMove || animStat in [ knockDown, knockDown_T ]
    return

rbody.velocity = (rbody.velocity.x, jumpSpeed)
animator["IsGrounded"] = false
animator["GoJump"].trigger()

if transformed
    // Energy cosumption
    if GameManager.hasumiEqSlot1 == 5 || GameManager.hasumiEqSlot2 == 5 || GameManager.hasumiEqSlot3 == 5 || GameManager.hasumiEqSlot4 == 5
        gameManager.energy -= 1.5f
    else
        gameManager.energy -= 3f
```

# Attack1
```
if isTalking || animator.current in [ minigun2, minigun3, knockDown, knockDown_T ]
    return


```