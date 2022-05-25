<script>
    import BaseComponent from "./BaseComponent.svelte";

    export let item;

    const refreshBody = () => {
        if (item.gameObject && item.gameObject.refreshBody) {
            item.gameObject.refreshBody();
        } 
    }

</script>

<BaseComponent name="Body Physics">
    <div slot="icon">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M32 72V48a16 16 0 0 1 16-16h24a8 8 0 0 1 0 16H48v24a8 8 0 0 1-16 0Zm8 80a8 8 0 0 0 8-8v-32a8 8 0 0 0-16 0v32a8 8 0 0 0 8 8Zm32 56H48v-24a8 8 0 0 0-16 0v24a16 16 0 0 0 16 16h24a8 8 0 0 0 0-16Zm40-160h32a8 8 0 0 0 0-16h-32a8 8 0 0 0 0 16Zm96-16h-24a8 8 0 0 0 0 16h24v24a8 8 0 0 0 16 0V48a16 16 0 0 0-16-16Zm8 144a8 8 0 0 0-8 8v24h-24a8 8 0 0 0 0 16h24a16 16 0 0 0 16-16v-24a8 8 0 0 0-8-8Zm0-72a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8Zm-32 72V80a8 8 0 0 0-8-8H80a8 8 0 0 0-8 8v96a8 8 0 0 0 8 8h96a8 8 0 0 0 8-8Zm-40 32h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16Z"/></svg>
    </div>

    <!-- TODO:
    Switch between type Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | MatterJS.BodyType
    -->

    {#if item.constructor.name.indexOf("StaticBody") === 0}
        <div>Arcade.StaticBody</div>
        <div class="line">
            <span>Debug</span>
            <div class="values">
                <label>
                    Body <input type=checkbox bind:checked={item.debugShowBody}>
                </label>

                <label>
                    Velocity <input type=checkbox bind:checked={item.debugShowVelocity}>
                </label>
            </div>
        </div>

        <div class="line">
            <span>Gravity</span>
            <div class="values">
                <label>
                    allow <input type=checkbox bind:checked={item.allowGravity}>
                </label>

                <label>
                    mass <input bind:value={item.mass} type="number">
                </label>
            </div>
        </div>

        <div class="line">
            <span>Pushable</span>
            <div class="values">
                <label>
                    <input type=checkbox bind:checked={item.pushable}>
                </label>
            </div>
        </div>


        <div class="line">
            <button class="act"
                on:click="{refreshBody}"
            >
                Refresh Body
            </button>
        </div>
    {:else if item.constructor.name.indexOf("BodyType") === 0}
        <div class="line">
            <span>MatterJS.BodyType</span>
        </div>

    {:else if item.constructor.name.indexOf("Body") === 0}
        <div class="line">
            <span>Arcade.Body</span>
        </div>

        <div class="line">
            <span>Bounce</span>
            <div class="values">
                <label>
                    X <input bind:value={item.bounce.x} type="number" step="0.1">
                </label>

                <label>
                    Y <input bind:value={item.bounce.y} type="number" step="0.1">
                </label>
            </div>
        </div>

        <div class="line">
            <span>Collide World bounds</span>
            <div class="values">
                <label>
                    <input type=checkbox checked={item.collideWorldBounds}

                    on:click|preventDefault={() => {
                        item.setCollideWorldBounds(!item.collideWorldBounds)
                    }}
                    >
                </label>
            </div>
        </div>

        <div class="line">
            <span>Gravity</span>
            <div class="values">
                <label>
                    X <input bind:value={item.gravity.x} type="number" step="0.1">
                </label>

                <label>
                    Y <input bind:value={item.gravity.y} type="number" step="0.1">
                </label>
            </div>
        </div>

        <div class="line">
            <span>Size</span>
            <div class="values">
                <label>
                    Width 
                    <input value={item.width} type="number"
                        on:input="{ e => {
                                let val = parseFloat(e.target.value)
                                if(typeof val == 'number' && !isNaN(val)) {
                                    item.setSize(val, item.height, item.center)
                                }
                            }}"
                    >
                </label>

                <label>
                    Height <input value={item.height} type="number"
                        on:input="{ e => {
                                let val = parseFloat(e.target.value)
                                if(typeof val == 'number' && !isNaN(val)) {
                                    item.setSize(item.width, val, item.center)
                                }
                            }}"
                    >
                </label>
            </div>
        </div>

        <div class="line">
            <button class="act"
                on:click="{item.updateFromGameObject && item.updateFromGameObject()}"
            >
                Refresh from GameObject
            </button>
        </div>

        <!--
    this.player.body.setBounce(0.4, 0.4)
    this.player.body.setCollideWorldBounds(false)
    this.player.body.setGravityY(300)

    this.player.body.setSize(150, 480)
    this.player.body.setOffset(290, 5)
    this.player.body.updateFromGameObject()

        -->
    {/if}    
    
</BaseComponent>

<style>
    .line {
        padding-left: 1rem;
        display: flex;
        /* width: 100%; */
    }

    span {
        margin-right: auto;
    }

    .values {
        display: flex;
    }

    .values label {
        display: flex;
        margin-left: .5rem;
    }

    button.act {
        border: 1px solid #303030;
        background-color: #585858;
        border-bottom: 1px solid #242424;

        margin: 4px auto;
        padding: 2px 8px;
        border-radius: 0.375rem;
    }

    button.act:hover {
        background-color: #676767;
    }

    input[type="number"] {
        width: 50px;
    }
</style>