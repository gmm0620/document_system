export function AcquireImage() {
  console.log(Dynamsoft.WebTwainEnv.GetWebTwain)
  var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer') || Dynamsoft1.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
  console.log(DWObject)
  if (DWObject) {
    DWObject.SelectSource(function () {
      var OnAcquireImageSuccess = OnAcquireImageFailure = function () {
          DWObject.CloseSource();
      };
      DWObject.OpenSource();
      DWObject.IfDisableSourceAfterAcquire = true;
      DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
    }, function () {
      console.log('Failed to select a source!');
    });
  }
}