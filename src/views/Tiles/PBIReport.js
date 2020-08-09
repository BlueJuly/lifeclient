import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Title,
    Left,
    Body,
    Right,
    Subtitle,
  } from 'native-base';
import {WebView} from 'react-native-webview';
//import * as pbi from 'powerbi-client';
function PBIReport({route, navigation, }) {
  const url = 'https://' + route.params.resource[0];
  const reportType = route.params.type;
  useEffect(() => {
    //console.log('------- WebView Component pbi ------', pbi);
    //console.log('------- WebView Component window ------', window);
  });
  function goBack() {
    navigation.navigate('Homepage');
  }
  let accessToken = `H4sIAAAAAAAEAB1WtQ7sihX8l9s6kpkivcIMa2a7MzOt2VH-PXvTn2ZmzsB__ljpM8xp8efff-bT2TrD8AKi4S4LqwTs6ri9giWmv4EiHZkEHYTvk5r8NhKjld57HpKaHmybQUW3dxHzVV3Ya_tfcqzQtmxTX0HPsNIfniqWUYx3jq_VB1S3QU0c0RARyPoo4ATS_lpKrsS864dWeyAesGzxHbsx0lUtgZlmsBEHaJdbAxlDR4fDzTzfFoi6KNv80nq1LVZf0c5VBjAbUKIrw9vBfVPviSvIGaSTuXusstNCh6q06teILaEUD6bnKuKJoJMm99sqjSwMjJXywdoQ_RBBtn-6moYH-_YC3ZmfkukUX7-yIx9euOZJHmoEpcfYaz_dXSmNrGoyETDK99qmIs94US1dE6pEqdB5JR_PCXksEF2kzt1tRUtanz1MVgXlVydjG9rYWTkRJ6JhN83EXgp9Ws4_zJC1KVukH3vxlJbqDygONmFn0bmDiW0Y1jwLAdWteXGOTGeEbfn1j5neQP0wG46pvZJu0MndlDW01nGKT8bWtLnyyc_j44bXqBatMA7LI9V2kGLozN6y8MziCRrnYRpDSK_a7l8JGR2TDcwDAT4bHy5BNGgl6SB8aSYT23Y_dcfKlYlWxnfbrWHTJXseB1Zn0EGTmI9UQSdN_2YtbHz9oGuVZUy-byLnsq5OPeUBPEXT-dnF4QNMb4cJ-XUaIPOqQDIiMZ-R6q0Sp9GOuNWEvJnLaP-G14LkdfXgRECtfdDsCCySRy_V4Ei6U-RT71QvXJP3shp_hqM56MyFMqQy4F0IpwzN8ajuXMNJGJ3XKtHdjcj77n1IEx47UKVsKngyUIu-rJOf-fI69mCWNVRyaP51DXPVant_dl38vczASJPO7YTpMvzD2bxOKp5c06WAQjcBDTJ8VpBJZmYzy1W2O7MqjF1_rKqxxDADBWUdWxWbM8UptXBRj1JpOxvKJcpBUqr5HiR2T3hKgxWX91knBaSswvNVKoGrIehSZ2dfSoMwTAiPfumF4ml95Vk7v_K9YgVBn3-u9BSN-8ziB5VP-Gs8l97FLj6laaVdK4ZHL_nt5jc3LiR358lIBrs7-Dh0Rq83yn7WmPs6wWB9IsEu5VhIJnu1Hf7F2VvnInK33meUod7jmkI4nlhUyU87nyP66LZBYNFjR_G2qkVQPFE8dO6k0EQsL-_EvEuXrtIHmw2jJWknED37Dq3ag306-Em9vq5sQkV12FFv4JL2uuNFug7lG3lTtMbhp53HMQWY2l-d-6FFtLXUgqfyAdjz2YrkHlRt6e-uXwWLkqhrZnSu7VjbAxlRUA_hmS0TF8fntOVkML0PDLkUtlgvIOMPs1ah7J_5EwRunBJ1L9JQkmjzhS4xdt5GOqq3_L6L2BxTygnoiXYMq4PCDvu6Z8Vv98ZwFI2qs7ldnPds0ik8RKr5MRRT2MGIW-oau2XfxcIixllv_NN0KChUsKl9MmLk5udQm9GXPJRLSveakc37lhTVfVd9NsLCS1yqlRaUw1sAhUbkZDAj38K9D2QeW2iq2QIi1Livrd8J8a5mhgMK3EHSRXY9hbDVMgHqrJjGlPPdj-GYV337wMawzlxABmCSuxGhFeHiaZ3QrD2v3Bg_nODgDDIuZMX-UF_ja2VwQ4OHlwOf8xvEF7n4uEM_o75Gby1sUg5Zy-wIk8piWZplDjQgbwnGyI6vJsIfj3L7jPA4vOsoABfAdhM3PygFJsQKw6Cu14onT-olp0kGul29zEfFNoNxS4NFcdf15RuY3aA4sDXMt5CJXKdVlX-Y17e4LWWW-h008phqdlxeyngiGdukQH-uG0PX5fmpGTo-lIl7KXczjr4-QlUEaN42eYh389kD73PwDVlxj1W_GCyYe87AQqtKLp8WeyqixEtppagFotyBUUpqWI71yUJ5AzLxr6Rv1zzafGXMSliAsHZd8Bq3NkPTC-2pCh6r2uXTHkois0-YH9DLpEZqJTasQuoNoaX2_RyOiDnzW7taI8GQ7fEdp9fGNucwiEqP71-RfYgNgTQ4wgvoHSlmubeLKY1rIFLutgjZyfZUukl9f2eZWAxczfZLR5p1cZO5IhFinw-mCGfqHQu9WAX5zobFtcnLgBk8x6eDCzpJq8HuY3e7CkAluNv3YPBoZ_Ecs3YsVgrvZ24eEHr6PTQVqD5AEwvDTT0l5dxYrmSTnoGpFMEHqVA818dxaW9uQq39hWNB_Ithly_iY8OVi4gqgibRTi_uYOIYeikHyQFiYjCmeH_6sjYcKmIeiYErCDBZE9v1xlF_lIZPgHNWiIloIjpdGa_PI0x4Q_32mv0rLDlQVHAi42ON4gQ-nvYLqtCHW2rVAKzMSusxz1nJmLIT-POvP9z3Wfb5Uz6_OaSDMAYismdn5_J7XP56eLSHHGJqxu2WRySPKsrD2yBGi_JogMUKMoRwcZPR_Jywm5vcZz99SUKiiFkITgU2xe5D1wiEN4-fUndl-QHmNaOjnntZ0zPCn_b0mwhj_1UiQf_l5fLMMBfPUsDLpUjtzFXwpY6XUIV39hd39mvaX8r7DRAtAtTkik5xCE6zzU2S5knUZNpTYgA4BaklYm-YTOdtIRnPMQyGBnKVS8NZzUDg4jLGNyCu6KrvjApC8kGZOG4ZWaRSFyoYO8QJrrHoq04RWvcEyvwg-97U2P0u9F6tDLPkcdfMGmFJSzjaftwBZefMg5Bs0DZF9Uq992ZIl0ngXP3PP39pfpam_CrBj2V8dXWtzq7F0M68v0TUBFWa-f-V29ZTuh_f8neWjj6n5q4Cl7N1CdTOYzCIWsvWSr3UURlhYGpvQVyek19G-SIzhEvLyH2AX33YoPgrNICTqV-MetpELC3JYhPdgjWiDqlqQg-sExElJDOSHhac8DUxzSdhZIkfhatqd9Ua_DysYdAVCoMHudMyNeU7Nnoxj6kGjlUfWapRtC4mtN9xeZLLjSk0L_NtQ51k-wCXkItVvXmQ2a0kbqnJNJR-ftu5dbHMV8zU0vvCMDdj75ilVvvLKSs9TMX5GAN1lKc_CdNKRMlrriRLHpUdnb0If9J51xreEzh_524BqmzN-Iw02Rb0XzdJDfTy9qOew3eE4fudLuT-eU6dqwkFC8qQLeWvGP_9HxctPboCDAAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19`;
    let embedURL = "https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d";
    let reportID = "f6bfd646-b718-44dc-a378-b73e6b528204";
    
  const htmlReport = (accessToken, embedURL, reportID, reportType)=>{
      if (reportType === 'mobilereport') {
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
                        visible: false
                    }
                    },
                    layoutType: models.LayoutType.MobilePortrait
                },
              };
              var reportContainer = document.getElementById('reportContainer');
              var report = powerbi.embed(reportContainer, config);
              </script>
          </body>
          </html>`
      }
      else if (reportType === 'desktopreport') {
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
                },
              };
              var reportContainer = document.getElementById('reportContainer');
              var report = powerbi.embed(reportContainer, config);
              </script>
          </body>
          </html>`
      }
    }
  return (
        <Container>
        <Header>
        <Left>
            <Button transparent onPress={() => goBack()}>
            <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>Tiles</Title>
            <Subtitle>Report</Subtitle>
        </Body>
        <Right />
        </Header>
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlReport(JSON.stringify(accessToken), JSON.stringify(embedURL), JSON.stringify(reportID), reportType) }}
            />
        </View>
    </Container>
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
