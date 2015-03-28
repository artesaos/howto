# Eloquent

## Relacionamentos 1 para 1

A relação de `1 para 1` que existe entre as tabelas de nomes `peoples` e `address`, conforme demostrado figura abaixo:

![1 para 1](https://github.com/diasfulvio/how-to-laravel/blob/gh-pages/images/1-1.png)

Ou seja, 1 pessoa possui um endereço e esse endereço pertence a uma pessoa. Esse relacionamento pode ser questionável mediante ao fator de que um endereço pode morar mais de uma pessoa, mas, por motivos ilustrativos vamos dizer que isso não aconteça.

Para refletir isso no Laravel crie as seguintes classes que herdam do Eloquent (Model).

__Peoples__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Peoples extends Model
{
    //Nome da tabela.
    protected $table      = 'peoples';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'id';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = ['name'];
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento.
    public function address()
    {
        //     $this->hasOne(relacao, chave estrangeira, primary key);
        return $this->hasOne('App\Address', 'peopleid', 'id');
    }
}
```

__Address__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    //Nome da tabela.
    protected $table      = 'address';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'peopleid';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = ['peopleid', 'location', 'city'];
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;
    
    //Relacionamento.
    public function people()
    {
        //     $this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Peoples', 'peopleid', 'id');
    }
}
```

##Codificando

###Inserir
```PHP
//criando pessoas e logo após o seu endereço 
$p = Peoples::create(['name' => 'name 4'])
        ->address()
        ->create(['location'=>'location 4', 'city'=>'city 4']);
        
```
###Alterar
```PHP
//buscando a informação
$p = Peoples::find(4);

//alterando campos
$p->name = 'name 4a';

//salvando as informações de pessoas
$p->save();

//Atualizando inclusive o endereço se assim quiser
$p->address()->update(['location'=>'location a4-4444']);

```

###Excluir
```PHP
//buscando a informação
$p = Peoples::find(4);

//verificando se encontrou a informação
if ($p) 
{
    //operações de remover endereço e logo após pessoas
    if ($p->address()->delete())
    {
        if ($p->delete())
        {
            echo 'Excluído com sucesso !!!';
        }
    }
}
```

##Referências: 

- [Eloquent One To One](http://laravel.com/docs/5.0/eloquent#one-to-one)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)
    
    



