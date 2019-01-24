<template>
  <article id="sobre" class="active">
    <router-link
      class="close"
      to="/"
      tag="div">
        Close
    </router-link>

    <h2 class="major">Sobre</h2>

    <p>Site de clipping com o propósito de não permitir que a história se perca nesses estranhos tempos de políticas
      líquidas. <br><br>
      O template veio do <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP!</a>, a ideia veio do <a href="https://gayhomophobe.com" target="_blank" rel="noopener noreferrer">Gay Homophobe</a>, o source está no <a href="https://gitlab.com/alcram/mamata" target="_blank" rel="noopener noreferrer">GitLab</a> e ele está sob a licença <a href="https://pt.wikipedia.org/wiki/Beerware" target="_blank" rel="noopener noreferrer">Beerware v. 43</a>, o que significa 2 coisas:<br>1 - Ele é CC0 e você pode fazer o que quiser com ele.<br>2 - Se você gostou do site vai OU me pagar uma breja no link abaixo OU fazer um brinde ao site e deixar uma gorjeta bacana pro garçom/dono do boteco.
      <center>
        <br>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="UGSL4ZXWTK8AS" />
          <input type="image" src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          <img alt="" border="0" src="https://www.paypal.com/pt_BR/i/scr/pixel.gif" width="1" height="1" />
        </form>
        
        Contato através do <a href="https://mobile.twitter.com/tuttigachimuchi" target="_blank" rel="noopener noreferrer">@tuttigachimuchi no Twitter</a><br>(sem propostas de devs, pelamordedeus)
      </center>
    </p>
  </article>
</template>

<script>
export default {
  name: 'v-sobre'
}
</script>
