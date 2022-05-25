export function resetGameObjectTint(
  currentGameObject,
  tintMemo = undefined
) {
  if (currentGameObject && currentGameObject.setTint) {
    if (tintMemo) {
      currentGameObject.setTint(...tintMemo)
    } else {
      currentGameObject.clearTint()
    }
    //         currentGameObject.resetPipeline();
  }
}

export function tintGameObject(currentGameObject) {
  let tintMemo

  if (currentGameObject && currentGameObject.setTint) {
    if (currentGameObject.isTinted) {
      tintMemo = [
        currentGameObject.tintTopLeft,
        currentGameObject.tintTopRight,
        currentGameObject.tintBottomLeft,
        currentGameObject.tintBottomRight,
      ]
    }
    currentGameObject.setTint(0xffff00)
    //     currentGameObject.setPipeline('Selected');
  }
  return tintMemo
}