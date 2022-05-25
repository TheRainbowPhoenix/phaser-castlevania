<script>
    export let name = 'Unnamed';

    export let collapsed = false;
</script>

<div class="component">
    <div class="title" on:click="{() => collapsed = !collapsed}">
        <button class="down">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="4 0 16 20">
                <path class:rotated={collapsed} fill="currentColor" d="m15 8l-4.03 6L7 8h8z"/>
            </svg>
        </button>
        <slot name="icon">
            <svg class="placeholder"/>
        </slot>

        <span>{name}</span>
        
    </div>
    <div class="props"
        class:collapsed={collapsed}
    >
        <slot></slot>
    </div>
</div>

<style>
    path.rotated {
        transform: rotate(-90deg);
        transform-origin: 12px;
    }

    .props.collapsed {
        height: 0px;
        display: none;
    }

    .down svg {
        width: 16px;
        height: 20px;
        padding: 2px;
        color: #6C6C6C;
    }

    .title :global(svg) {
        width: 20px;
        height: 20px;
        padding: 2px;
    }

    .title :global(div) {
        display: flex;
    }

    .component {
        border-top: 1px solid #1A1A1A;
        background-color: #383838;
    }

    .title {
        background-color: #3E3E3E;
        color: #D2D2D2;

        display: flex;
        user-select: none;
        height: 24px;
    }

    .title:hover {
        background-color: #474747;
    }

    .title:focus > span {
        color: #81B4FF;
    }

    .title > span {
        margin-left: .5rem;
        display: flex;
    }

    .props {
        border-top: 1px solid #303030;
        color: #C4C4C4;
        display: flex;
        user-select: none;
        flex-direction: column;
    }
</style>