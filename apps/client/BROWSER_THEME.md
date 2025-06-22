# Browser Theme Color Configuration

Este documento explica como a cor do tema do browser é configurada dinamicamente na aplicação.

## Problema

A search bar e outros elementos do browser estavam ficando pretos em vez de seguir o tema da aplicação (roxo #7d52f4).

## Solução Implementada

### 1. Meta Tags no HTML (`index.html`)

Adicionamos múltiplas meta tags para suportar diferentes contextos:

```html
<meta name="theme-color" content="#7d52f4" />
<meta name="theme-color" content="#7d52f4" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#7d52f4" media="(prefers-color-scheme: dark)" />
<meta name="msapplication-navbutton-color" content="#7d52f4" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

### 2. Hook Personalizado (`use-browser-theme-color.ts`)

Criamos um hook que:
- Monitora mudanças no tema da aplicação
- Atualiza dinamicamente as meta tags com a cor primária atual
- Suporta tanto tema claro quanto escuro
- Usa MutationObserver para detectar mudanças de classe no elemento root

### 3. Integração com ThemeProvider

O hook é usado no `ThemeProvider` para garantir que a cor do browser seja atualizada sempre que o tema mudar.

## Como Funciona

1. **Inicialização**: O hook lê a variável CSS `--primary-base` que contém a cor primária
2. **Atualização**: Quando o tema muda (light/dark/system), o hook detecta a mudança
3. **Aplicação**: Todas as meta tags relacionadas ao tema são atualizadas com a nova cor
4. **Fallback**: Se a variável CSS não estiver disponível, usa #7d52f4 como fallback

## Suporte a Plataformas

- **Chrome/Edge**: `theme-color` meta tag
- **Safari iOS**: `apple-mobile-web-app-status-bar-style`
- **Internet Explorer**: `msapplication-navbutton-color`
- **Responsive**: Suporte a `prefers-color-scheme` media queries

## Benefícios

- ✅ Search bar do browser segue o tema da aplicação
- ✅ Suporte automático a tema claro/escuro
- ✅ Compatibilidade com diferentes browsers
- ✅ Atualização dinâmica sem reload da página
- ✅ Fallback para cor padrão se necessário
