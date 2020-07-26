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
    let accessToken = `H4sIAAAAAAAEACVWtQ7sCBL8l5f6JDOdtMGYmTmzx8xMq_v3m9Xm1UFXF_Tff6z06ac0__PfP2YhvlE0zX5qNoYUJqG3yoMBgdz4aV3JztxTWV9MB_YcL-lGlLtXSb68ScCKGBRlNVyF57Cw_HYhQjWRdsevAaPbcsP85xzA4BPBJiHB4J45qFakOO_79-2gPm1NL22qTqbkMd5hsV8eBbOVbq8CfP9RcKeeiKbfwANIv4xCTUIMGvCiDyNGUZXmTgr48T-kLrMnfQmGYJDPUa_e6Bua7iArllvEOIYDognFRgSeXnHzdl7gPaa4fgg3nCjxzDneOQpAQcMPea-NLHvL8lkTxqBZL0xwo6JCDc2gydD4u02ZOyzy0Ork83k7ieVMgiZrn6et90LwDtFx9ThoRKzlT-SG8UBy_guBl96cZv8iy9soZsa012WLvuQNqIloNFX7gDKB8TCPtj6tah9AOdG3DF8iurVGMjHayGYzbHQEXxQW94lAjA_ZrwoI3w3yyPRvnB8GxnePhVOaUz4Kg-dEI8UW3pfI2snRISQmnJAqjm1RZtddYektGmpscCxuFJVi35puzjN2frA9QgXzvT8faOgv99J7PDRufnVyHLPDZWCaJiaCIB9AP5Z6ec20U7iVT0pURlsRYk2FCW1A2ajhBrWZN0fTGv0aLeBH5adWZ6YNYLpMTeYLVsjvqJmGUWhJ1pY5OBy9HS6rNT2Uv48NxIt2bx_AITvWPOa9gj3scH1r0BvDCX25W6W94vum8c5VByRaqc6uzBFq-6CCr-QowJqa0ABtzp1dz9zlkWKhGFuS1zC-bGSg8m5BGQOmhNISI50BcNnjAtdCOcdjZlQH-tOGAGucjgFMylHT1Gq6oJ5F2vgDQbdTYzVthyaOyg6LRXvoN0oovHcRsA5ldMzsmkW1UPh0Vecb4LKRQJWIoj8rOiTLKFJIzFdeEAi5XN64NpLSqah4ZHO_wMLZpWjm5Cu7gp_k-jC0i6o8-U94Uyft4zeq1BsKywueyLrYYC7CyZN95Bi7XmItCbvKDXCtyYlhj7aQDYjo6SSJKPTITcTN3WsJ05mNt_bCBdnZOkBtuKSGktfLcNFj60chRetC2W0iPT30hOYhN0rHbxrYR_Jgm-Q9GmiZdy7HhnydK-ZoQhqc5A5U7hLcG8X9pGNt1qJNVlOjfMtzG0rZ_roBv9nIs76dH7MGnBKO0SA63xGKo4ivte8wLgDpqnwFd_5ALW_RXTS2hoENWBww2BA5TVsPVtV6XzYAhmUdhwjnz_hIkIf-WooKXcltle3jeJZzeAMPBq7KNVQbFAovVOZKHnO_tZ3muAVpIKeh6FFOeO3u55Z7gmJlNDsSmZUGoWjtkw0dfvYZ2On3RZS4MW7GOBJYlDaios2Gg8ZG6rsyzC9FSa0zlp3HfRTnVuAjVbJV_U7La4arcWtvLOnCRfOqmjM3KRzck-9Mm64OdvfHoNXWk5jT4nLSeZ9lKA_EHN3S2Ir1fOyq1DW-TNjh9G1ryKzz4WVJ9UOnPunKc4aU8Natp1yQzjztFeUQb3i40Tx-U6pnEYHRZcpfelJ3so4JAj8OqbcDtPOp7Fsk9-S5LmbhPuGEL_blNbGUekdxakluTAeaZUjPJUTTXD_Dh5KrTXs4XvfmaQi5IGg9pxCGrUuM3sMeu7mA_bhskG524LPSadFXzfjhD2Ti0V-Ay4FxqRleBNoO2RBwVwKTyTXg4NwpeaF7ACtuBSYoTSiqBYs_clJawgiQMbBr0KWqdYQQkFCyt2_z0etJqILAW4h6drMl-ujtI2OOj5Pzyw0ZmeNEjXQeVDdhUeWfPPXn2GSW54MduJo87IAxDdki25YC7Xv8PPBTdhMl31-rmZdH1-QxfN0K85NxJWoe78o6U3PqnT08Z22dBe9NH36He7_5QDpsZjETp-FUY7rFjHLLsn4ZzzspE2WkYLpubZlbWwoSPMuzfOsm8ysh3TqDxvtFEdkfYxX3eln1EP5dQp3IJnuziAIjUbPn725LN6b9gojIVA0lwuP6DRp34qpMKsZkMWgEj7t2-Nb7yql9xlbKcWlRQ2i7KaBRC89l2y89cV0QkAmftO8-ENwFlP4FeBWquRkhMAV6KkqeGqfwurAxcO3xLNanYhqAz3KHvMZi_AEifqUjJfxRCFx0kZ2Rj4Pu8mOhJUxlH4R_HuGmuINtuAMAa4XLaGWkYAsZYOx5T4O4R-lKXNLN6_wv69Z4qMUz2rtapG9opic2qHuOp_B2Nr-zx1gohvAFkImXNBi2lTovc1Oao0tYuk1lGIgKUD6LgnqTcz7pWSLt2P75zx92feZ9Uovn9864GNk6IJFmtnCskR3due8_xOVgmEaiAlRIs8hsaiWwGbJ6zmdJSvNrlpVVKpNU1u2Cm4OodUpZiogjRsMkpU9qcrcR9kq4vtYvgwuxP8ONA14hFh6JmMAD8gSADJYqIbSbHdSXxm4xDvpyvIRfdW20-ym1UE81fi9feQH1GdtVnE2YVzvu5PEJEvrexBvb0H1-H9Bt0Qwv4w-u-NcevIbZX4QrvGQEaBrHc2RbreypTW2mweGMwSOkqnu4KIw3PU3phqJvfd9G2kiWRZfDOlWGgkh491DqCVSmuehulRPB9lBACV_mbNVf1Q542Tve12bvMDDpqII3YJ6iQKgHaVXRw7_--usfmp-5LlY5-LHMay8e86inMxLtSYhRX2po_4tym2pM92MtfrA-b721HGfWCYiw0KqSbcojdAWzUYvI55hlYSwiQXwP3OcSDxavk3THBkM9b9Fpeii6V575GNJWGBONIrJ928yBB-bfW2jRS1Pmrnrge983N76Cs6R7QJAIxUk9j5HqHyda7ukLh4-jC-3cSo1HPnIkMvhJBuMtOaBQ9oexGehwcF9GwmOSKDUziT4X4qHn_sHlkDzQOYP6rFbllMZk6QSahkP5vYN6NRt0pDP1EJIsMu5FJNiNh28B4L0-UtME4XlhAThHqfapteeO0o2ydFfkZMCd-KpOTKArkCT7xYY2OpM4jcFwo35kFoCr4QmizUvKgGzMuT55LV88zBjrtX_7C_aP5v_9H-riGHjCCwAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19`;
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
