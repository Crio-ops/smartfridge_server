const { expect } = require('chai');
const { decomposeKeywords, decomposeCategories, compareArrays } = require('./votre-fichier.js');

describe('Décomposition des mots-clés', () => {
  it('devrait retourner un tableau vide pour des mots-clés inexistants', () => {
    const item = { keywords: null };
    const result = decomposeKeywords(item);
    expect(result).to.be.an('array').that.is.empty;
  });

  it('devrait retourner un tableau de mots-clés', () => {
    const item = { keywords: ['keyword1', 'keyword2'] };
    const result = decomposeKeywords(item);
    expect(result).to.deep.equal(['keyword1', 'keyword2']);
  });
});

describe('Décomposition des catégories', () => {
  it('devrait retourner un tableau vide pour des catégories inexistants', () => {
    const item = { categories: null };
    const result = decomposeCategories(item);
    expect(result).to.be.an('array').that.is.empty;
  });

  it('devrait retourner un tableau de catégories', () => {
    const item = { categories: 'Category1, Category2' };
    const result = decomposeCategories(item);
    expect(result).to.deep.equal(['category1', 'category2']);
  });
});

describe('Comparaison des arrays', () => {
  it('devrait retourner null pour aucune correspondance', () => {
    const array1 = ['apple', 'orange'];
    const array2 = ['banana', 'grape'];
    const result = compareArrays(array1, array2);
    expect(result).to.be.null;
  });

  it('devrait retourner un objet avec le mot correspondant et la catégorie complète', () => {
    const array1 = ['apple', 'orange'];
    const array2 = ['banana', 'orange'];
    const result = compareArrays(array1, array2);
    expect(result).to.deep.equal({ match: 'orange', category: ['banana', 'orange'] });
  });
});
