# Eloquent

## Relacionamentos Muitos para Muitos com Tabela de Estrutura de Relacionamento

Esse tipo de estruturação é indicado quando várias tabelas são associadas a um delas de modo especial. Na imagem abaixo a tabela `tags` se associa com as tabelas `comments` e `noticies` de modo a `tag` de `id = 1` pode estar em `comments` e `noticies` ao mesmo tempo. Para isso é criado uma tabela que simboliza a relação mais o tipo da relação.

![1 para 1](https://github.com/diasfulvio/howto/blob/master/images/N-M-Morph.png)

Para refletir isso no Laravel crie as seguintes classes que herdam do Eloquent (Model).

__Notices__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    protected $table      = 'notices';
    protected $primaryKey = 'id';
    protected $fillable   = array('title');
    public  $timestamps   = false;

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable', 'taggables', 'taggableid', 'tagid');
    }
}
```

__Comments__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table      = 'comments';
    protected $primaryKey = 'id';
    protected $fillable   = array('title', 'text');
    public  $timestamps   = false;

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable', 'taggables', 'taggableid', 'tagid');
    }
}
```

##Codificando

###Inserir
```PHP

```
###Alterar

_Alterar tabela muitos para muitos não é usual, só altera mesmo as tabelas de `Authors` e `Books`_

###Excluir
```PHP

```

###Listar
```PHP

```


##Referências: 

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)

