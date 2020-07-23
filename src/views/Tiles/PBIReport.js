import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
//import * as pbi from 'powerbi-client';
function PBIReport({route, navigation, }) {
  const url = 'https://' + route.params.resource[0];
  useEffect(() => {
    //console.log('------- WebView Component pbi ------', pbi);
    //console.log('------- WebView Component window ------', window);
  });
    let accessToken = `H4sIAAAAAAAEACWWxcrGDJaE7-XfpiFuDb2Iu73x7OLunmHufb5m9nWgeChO1f_8Y6fvMKfFP__-J_jCqhx-N7VDhKDMwQcjikWvDNfp9dePMoZByfES0edo7dju0XkjzJoZKytgFCCrWdmWZ2aRgdcTcO3xiSH9NM2z5ap_bFSEKswFsjZ7KzyCXoRCHjtqQoWnKnv46DdBP5jSu720HouSobN04IVmIY9656KWPNTdE9ezy2G9Bv1wYtmn7yrChb_DY1uYo1iPi1BkAoW7U-Gw5hTvWOu1XoGkAa-MVZWwopDQXpJ6tkE1K-Nh3mfmolxRIB4HR3TofReZX-fI6mzI-JY1GGZx-Nmls_6kfMFpHcHyhTnikTrOiUWnH8RPoM57p0l0VtK5EpG3Ceb_hgTv1q01UGnslyOdPFwDsGoAITQ9oQut1C4E8yQb21xpMmCQPjoJBv9Eode4lzRQ8P1tSIryAhsy5OLovETUuoIoFCMiFjyvEWCKy6yi7bffHFoOG1KipNwFK4BXPJ-9RFcI-nh7akMWgSbuOB8wcgKPnUCq4bCf9chV1hoa1pLl-QA7vLadpOzgf4kqusoDM6Uo3K8j4R9-lxshF-eOjWMnnhuaim5leLoAPoJ_5LdsvYtaVxtMM1QSvOTaszBybnFGAcP0orlFjRjFnGNIOQFha9JMjEf43n23oeDc_xwDMnMG3ogMVGGgnS5GJ3agLtidn1vgqUFKYpWmeh0Q09EufZyEs99vOKwSGuaEcr7Hhcv56LUpI4Rl4WNLpaBt8ixgP1gMX794BobCdjAxpSb3epm1LgYR17EDkaIBWn3y5zYDGiFhl_DcxaTPqEuwoR2Aat3747sJP5EsKTyiCKyHCD2lfq4wrgmIdN0eUq39X5DgTV2wX7emCJWDk1Dv6U1MYM7e2CFZvRHRMoXfZs7GKtZFbPD6dZa0fZrpA7cTV6y0HUbAs6gPiU27q3BpDJaFqVzT5WJuG96KbE8SzhVlZyFd41LSfiLQN3d6XPsXtbJSR8MxfNhTI1_vDwQsT2gaV42rsvjnzoQPsYxraiYm35U-I9-ufcvvbNTOVoAk6bkr4kofDRwxpJZ8v0OMBRQHlXrYtoOaZdsfDtMW2-DgV1iY-wI_OBXTHeP3IJ-vhUEq15ETg1uM_AvhTbLhRhRrTTeUjTk8Z1TZyk2JLdBkGIIizZztW45ukxbGsd94AbMYs_BsojOMcByycPPIbp5e8kMEual__OApOP-bQ5IDdA4YEBhj-WbFMG9lVZCs3tg0F8OAEob8XVSJHj3CFC4BtkRJjQqF7QMFxoxq-dgfYQq0-xMpFbWPtrWKoO3lNStQzVcBe9Zh7DLn68c8HXGPj4S7aDrkGH7BGDlKC0TVNjW3Wf909TfwiI9RYomQGesDy3e6Fsn8MeBrvGE3sjpM3Z44mAeAZP3hImUV2TjMxz-qOihiPhpByNyNbKic7YZ6pM_zY4WabWKl90MTQ9SPnIRLSg1-WhCy_NGqTMOJCI4CyXJQpkH42UNKHV4BsJ3b-XlWubm2R_JdieYSVkZGT9sP7HRHrTrAPC5cctrKi9OMaVBMjVpV1WHZawDcBAkDacty9QP5fkqWgKq61UXJj3DzRRxHo5MLw-arQDso7zrhrGoNmNfQdI9L-cevs9DDrjdkq-MXmiA_VNt5RhOyHs1RutSTuU54wOv9_UI8c1LvAAfRoh6CuunqcL20Ywdj-blwfJ9iK0WWn_05pyS4Zjp9csC__AV9QpgKSrSbZqMmH1aFWVNaRa9amG6a3JwTZKezlQMJw9RFF7RyUSmQiPkszDWJFT0JlZLii2fbkOndR2nMCLCNQTsoAk083cVWTeG_7whvUW6ynzag0_YCF7z6euX2ooDo1DbPHFI4AKKcZyOrcJRvuzJVgDLHiuW57x65GxgSjrSzpvlrWfpLFGSebqB92DOt-i4dct6meoNXnLVerBChs5ls_cVQMKdA1SkmaaLkMIilZhxoVUDg_2rAkSKktit-B_O395J8O5JNWlRQS1s8Zg4nTVJ6uYC8RKXYjKIz9FHr1juVPnXf9ylVfV7qiCr1AfOaXxtO0caVFUN8J6lKQdpI1DaEtaqlN19eslpSGv2obCD6CVr31apEJrHW5AOfT5_fCpJRJR93F1CIq5SRhBHA7QpkSmOYXqwXYJfpSBSzsq0hEMtGV6p34pTc5rH0SYdLl45613S1tyuflAbjAQl7_xX4OoEtHC_d4RxMYmE7pB62rYcI84Dcrk-j1-yG3wnGx2yfsfSk-PtrPfzXPpz1iB5_Xfu7uwkD7eCveYNVUsV__vUPt73LMWvl-zdn0CgypTzalWfsfF797sf-7JV8LpbWMHGm2kGukkUqXGdcC1uMR7dTWmn8aSY6mnNWQ02m2NxDpag7sR3_Qg6u8Mhluyqzz7V2kbHa5C-T6x42_nXYLq8v2F4qPXmomiuwWOm-2N_zVB6_ncedDjdOlHm8Rn7TbtLih4NGJCHoxOaxK3ppLmjV1beC0wesH4E5rG8_tZtE9UZoSf3Fha_jPu8Z7-_kb93U2_wxh2AOvzP-5oMe_Dgh9RuggjVwzMpAwV7294e_6njOgKT3WJIoR1YgS3eRSssrdKVGdEOI_TUNiup-QXeSmd7xObELJUnIlFez-P6YaWEJN0GYjzos1qz-z3_-i_ldmnJTgj_KHUqbKQw4gHeVfxPnuBsGcP9f5bb1lB7nVv7J4ijC3Skdis-0BlLSIjvu5cWnEjSFTsouimGMdz9TpxCUjiN308qE4tpweU7l8mqAqMWGf8ZpQG8ek0d4xgsTwKWaTnQUPuaUN90-V21Oqgh4XYj3fQxngrGwGAXOm3W5_miUeBrKpeFMuErPKd5C6dTqp0MbWJOLbC2CwVnJ5qB7yFHN8GfG_3qU_0seLcxJzRdUXAY4GX89BjVyiqzGC1jmzxxzFG3uHo6ikgZd2uow_cUkoDjrj3maZk_TewVtK27E9sJsB2jBm6QAMvuruDStqGWCNNhqKYrTvPw4BdWfu3EEMdaQTRsKMyOAFO3U1USBIPFrPM2y_hZTXyic3q__xfy__wcvM9m3wgsAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19`;
    let embedURL = "https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d";
    let reportID = "f6bfd646-b718-44dc-a378-b73e6b528204";
 
    var configuration = {
      type: 'report',
      tokenType: 1,
      accessToken: accessToken,
      embedUrl: embedURL,
      id: reportID,
      permissions: 7,
      pageName: "ReportSectioneb8c865100f8508cc533",
      settings: {
        panes: {
          filters: {
            visible: false
          }
        },
        layoutType: 1
      }
    };
  const htmlReport = (accessToken, embedURL, reportID)=>{
    return `<!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width">
        <script src="https://cdn.jsdelivr.net/npm/powerbi-client@2.13.2/dist/powerbi.min.js"></script>
        <style>
            html,
            body,
            #reportContainer {
                width: 100%;
                height: 100%;
                margin: 0;
                background-color: 'white';
                -webkit-overflow-scrolling: touch;
            }
            iframe {
                border: 0px
            }
        </style>
    </head>
    
    <body>
        <div id="reportContainer"></div>
        <script>
        var models = window['powerbi-client'].models;
        var permissions = models.Permissions.All;
        var config ={
          type: 'report',
          tokenType: models.TokenType.Embed,
          accessToken: ${accessToken},
          embedUrl: ${embedURL},
          id: ${reportID},
          permissions: permissions,
          pageName: "ReportSectioneb8c865100f8508cc533",
          settings: {
            panes: {
              filters: {
                visible: true
              },
              pageNavigation: {
                visible: true
              }
            }
          }
        };
        var reportContainer = document.getElementById('reportContainer');
        var report = powerbi.embed(reportContainer, config);
        </script>
    </body>
    </html>`
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlReport(JSON.stringify(accessToken), JSON.stringify(embedURL), JSON.stringify(reportID)) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    marginTop: 20,
  },
});
// const mapStateToProps = ({userReducer}) => {
//   //console.log('----user in VideoPlayer view is-----', userReducer);
//   return userReducer;
// };

// const mapDispatchToProps = {
// };

export default PBIReport;
