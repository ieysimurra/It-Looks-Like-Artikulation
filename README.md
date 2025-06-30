# 🎵 Playground de Formas Sonoras Interativas

Uma aplicação musical interativa que permite desenhar formas que se transformam em sons, criando paisagens sonoras únicas através da interação visual.

## 📖 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Demo](#demo)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

## 🎯 Sobre o Projeto

O **Playground de Formas Sonoras Interativas** é uma aplicação web experimental que explora a intersecção entre arte visual e música. Inspirado em obras como "Artikulation" de György Ligeti, este projeto permite que usuários criem composições sonoras através do desenho de formas geométricas em um canvas interativo.

### ✨ Funcionalidades

#### 🎨 Sistema de Camadas
- **3 Camadas Independentes**: Cada camada funciona como uma trilha musical separada
- **Controles Individuais**: Cada camada possui seus próprios controles de frequência e forma de onda
- **Sobreposição Sonora**: Múltiplas camadas podem tocar simultaneamente

#### 🎛️ Controles de Som
- **4 Tipos de Ondas**: Sine, Triangle, Sawtooth, Square
- **Controle de Frequência**: Sliders para definir frequências mínima e máxima por camada
- **Efeitos Sonoros**:
  - 🔊 **Amplitude**: Controle de volume individual por forma
  - 🎚️ **Panning**: Posicionamento estéreo
  - 🌊 **Reverb**: Efeito de reverberação
  - 🔥 **Distortion**: Distorção harmônica

#### 🎮 Interface Interativa
- **Modo Desenho**: Desenhe formas clicando e arrastando
- **Modo Edição**: Mova e ajuste formas existentes
- **Modo Limpeza**: Remova formas individuais ou todas de uma vez
- **Playhead**: Linha de reprodução que percorre o canvas tocando os sons
- **Controles de Tempo**: Ajuste a velocidade de reprodução
- **Loop**: Reprodução contínua

#### 📹 Gravação
- **Gravação de Vídeo**: Capture a interação visual com áudio
- **Gravação de Áudio**: Grave apenas o áudio da composição
- **Log de Interações**: Export de dados de interação em CSV

## 🚀 Demo

Acesse a demonstração online: [https://editor.p5js.org/ieysimurra/sketches/zaegH5Sb1](https://editor.p5js.org/ieysimurra/sketches/zaegH5Sb1)

## 🛠️ Instalação

### Pré-requisitos
- Navegador web moderno com suporte a Web Audio API
- Servidor web local (para desenvolvimento)

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/interactive-sound-shapes.git
cd interactive-sound-shapes
```

2. **Inicie um servidor local**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (com http-server)
npx http-server
```

3. **Acesse no navegador**
```
http://localhost:8000
```

### Dependências
- **p5.js** v1.4.0 - Framework de arte criativa
- **Tone.js** v14.8.35 - Biblioteca de áudio web

## 📱 Como Usar

### Criando Sua Primeira Composição

1. **Ative o Modo Desenho**: Certifique-se que "Draw: ON" está ativado
2. **Escolha uma Camada**: Cada faixa horizontal representa uma camada
3. **Desenhe uma Forma**: Clique e arraste para criar uma forma sonora
4. **Ajuste Parâmetros**: Use os sliders para definir frequências e efeitos
5. **Reproduza**: Clique em "Play" para ouvir sua criação

### Controles Principais

#### Painel de Controle
- **Play/Pause/Stop**: Controles básicos de reprodução
- **Loop**: Ativa/desativa reprodução contínua
- **Tempo**: Ajusta velocidade do playhead (-2x a 2x)
- **Clear Mode**: Ativa modo para remover formas
- **Draw Mode**: Alterna entre desenho e edição

#### Controles por Camada
- **Frequência Min/Max**: Define o range de pitch para a camada
- **Tipo de Onda**: Seleciona a forma da onda sonora
- **Efeitos**: Toggles para amplitude, panning, reverb e distortion

### Dicas Avançadas

#### Criando Melodias
- **Posição Vertical**: Determina o pitch da nota
- **Largura da Forma**: Define a duração do som
- **Curvas**: Desenhe curvas para criar glissandos

#### Construindo Ritmos
- **Formas Curtas**: Crie sons percussivos
- **Espaçamento**: Use espaços para criar pausas rítmicas
- **Múltiplas Camadas**: Sobreponha ritmos diferentes

#### Efeitos Sonoros
- **Reverb Alto**: Cria atmosferas etéreas
- **Distortion**: Adiciona caráter agressivo
- **Panning**: Cria movimento espacial

## 🏗️ Arquitetura

### Estrutura de Arquivos
```
interactive-sound-shapes/
├── index.html              # Página principal
├── sketch.js               # Lógica principal da aplicação
├── style.css               # Estilos CSS
├── instructions_en.html    # Instruções em inglês
├── instructions_pt.html    # Instruções em português
├── docs/                   # Documentação
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── examples/
├── assets/                 # Recursos estáticos
│   └── images/
└── README.md
```

### Componentes Principais

#### Core Classes
- **Shape**: Representa uma forma sonora desenhada
- **Layer**: Gerencia uma camada de formas
- **AudioEngine**: Interface com Tone.js
- **Recorder**: Sistema de gravação

#### Fluxo de Dados
```
User Input → Shape Creation → Audio Synthesis → Visual Feedback
```

## 🔧 Tecnologias

### Frontend
- **p5.js**: Framework para arte criativa e visualização
- **Tone.js**: Síntese e processamento de áudio
- **HTML5 Canvas**: Renderização gráfica
- **Web Audio API**: Processamento de áudio nativo

### Funcionalidades Web
- **MediaRecorder API**: Gravação de vídeo/áudio
- **Canvas Capture**: Captura de canvas para vídeo
- **File Download**: Export de arquivos

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Veja como você pode ajudar:

### Tipos de Contribuição
- 🐛 **Bug Reports**: Reporte problemas encontrados
- 💡 **Feature Requests**: Sugira novas funcionalidades
- 📚 **Documentação**: Melhore a documentação
- 🔧 **Code**: Contribua com código

### Processo de Contribuição

1. **Fork o projeto**
2. **Crie uma branch para sua feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Diretrizes de Desenvolvimento
- Siga as convenções de código JavaScript
- Adicione comentários para funcionalidades complexas
- Teste suas alterações em diferentes navegadores
- Mantenha a documentação atualizada

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### Uso Acadêmico
Este projeto é especialmente adequado para:
- Cursos de arte digital e música eletrônica
- Workshops de programação criativa
- Pesquisa em interfaces musicais
- Projetos de arte interativa

## 📬 Contato

- **Desenvolvedor**: [Seu Nome]
- **Email**: seuemail@exemplo.com
- **Projeto**: [https://github.com/seu-usuario/interactive-sound-shapes](https://github.com/seu-usuario/interactive-sound-shapes)

## 🙏 Agradecimentos

- György Ligeti por "Artikulation" - inspiração conceitual
- Comunidade p5.js pela ferramenta incrível
- Tone.js pelos recursos de áudio avançados
- Contribuidores open source

## 📚 Referências

- [Artikulation - György Ligeti](https://en.wikipedia.org/wiki/Artikulation_(Ligeti))
- [p5.js Documentation](https://p5js.org/reference/)
- [Tone.js Documentation](https://tonejs.github.io/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐