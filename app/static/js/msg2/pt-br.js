var MSG = {
  title: "Código",
  blocks: "Blocos",
  linkTooltip: "Salvar e ligar aos blocos.",
  runTooltip: "Execute o programa definido pelos blocos na área de trabalho.",
  badCode: "Erro no programa:\n%1",
  timeout: "Máximo de iterações de execução excedido.",
  trashTooltip: "Descartar todos os blocos.",
  catLogic: "Lógica",
  catLoops: "Laços",
  catMath: "Matemática",
  catText: "Texto",
  catLists: "Listas",
  catColour: "Cor",
  catVariables: "Variáveis",
  catFunctions: "Funções",
  listVariable: "lista",
  textVariable: "texto",
  httpRequestError: "Houve um problema com a requisição.",
  linkAlert: "Compartilhe seus blocos com este link:\n\n%1",
  hashError: "Desculpe, '%1' não corresponde a um programa salvo.",
  xmlError: "Não foi possível carregar seu arquivo salvo. Talvez ele tenha sido criado com uma versão diferente do Blockly?",
  badXml: "Erro de análise XML:\n%1\n\nSelecione 'OK' para abandonar suas mudanças ou 'Cancelar' para editar o XML."
};

Blockly.Msg = { ...Blockly.Msg, ...MSG };
