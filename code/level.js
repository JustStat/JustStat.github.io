Mario.Tile = {
    BlockUpper: 1 << 0,
    BlockAll: 1 << 1,
    BlockLower: 1 << 2,
    Behaviors: [],
    
    LoadBehaviors: function() {
        var b = [];
        b[0] = 0;
        b[1] = 20;
        b[2] = 28;
        b[3] = 0;
        b[4] = 130;
        b[5] = 130;
        b[6] = 130;
        b[7] = 130;
        b[8] = 2;
        b[9] = 2;
        b[10] = 2;
        b[11] = 2;
        b[12] = 2;
        b[13] = 0;
        b[14] = 138;
        b[15] = 0;
        b[16] = 162;
        b[17] = 146;
        b[18] = 154;
        b[19] = 162;
        b[20] = 146;
        b[21] = 146;
        b[22] = 154;
        b[23] = 146;
        b[24] = 2;
        b[25] = 0;
        b[26] = 2;
        b[27] = 2;
        b[28] = 2;
        b[29] = 0;
        b[30] = 2;
        b[31] = 0;
        b[32] = 192;
        b[33] = 192;
        b[34] = 192;
        b[35] = 192;
        b[36] = 0;
        b[37] = 0;
        b[38] = 0;
        b[39] = 0;
        b[40] = 2;
        b[41] = 2;
        b[42] = 0;
        b[43] = 0;
        b[44] = 0;
        b[45] = 0;
        b[46] = 2;
        b[47] = 0;
        b[48] = 0;
        b[49] = 0;
        b[50] = 0;
        b[51] = 0;
        b[52] = 0;
        b[53] = 0;
        b[54] = 0;
        b[55] = 0;
        b[56] = 2;
        b[57] = 2;

        var i = 0;
        for (i = 58; i < 128; i++) {
            b[i] = 0;
        }

        b[128] = 2;
        b[129] = 2;
        b[130] = 2;
        b[131] = 0;
        b[132] = 1;
        b[133] = 1;
        b[134] = 1;
        b[135] = 0;
        b[136] = 2;
        b[137] = 2;
        b[138] = 2;
        b[139] = 0;
        b[140] = 2;
        b[141] = 2;
        b[142] = 2;
        b[143] = 0;
        b[144] = 2;
        b[145] = 0;
        b[146] = 2;
        b[147] = 0;
        b[148] = 0;
        b[149] = 0;
        b[150] = 0;

        
        this.Behaviors = b;
    }
};

Mario.LevelType = {
    Overground: 0,
    Underground: 1,
    Castle: 2
};

Mario.Odds = {
    Straight: 0,
    Jump: 1,
    FlyingBlock: 2
};

Mario.Level = function(width, height) {
    this.Width = width;
    this.Height = height;
    this.ExitX = 10;
    this.ExitY = 10;
    
    this.Map = [];
    this.Data = [];
    this.SpriteTemplates = [];
    
    var x = 0, y = 0;
    for (x = 0; x < this.Width; x++) {
        this.Map[x] = [];
        this.Data[x] = [];
        this.SpriteTemplates[x] = [];
        
        for (y = 0; y < this.Height; y++) {
            this.Map[x][y] = 0;
            this.Data[x][y] = 0;
            this.SpriteTemplates[x][y] = null;
        }
    }
};

Mario.Level.prototype = {
    Update: function() {
        var x = 0, y = 0;
        for (x = 0; x < this.Width; x++) {
            for (y = 0; y < this.Height; y++) {
                if (this.Data[x][y] > 0) {
                    this.Data[x][y]--;
                }
            }
        }
    },
    
    GetBlockCapped: function(x, y) {
        if (x < 0) { x = 0; }
        if (y < 0) { y = 0; }
        if (x >= this.Width) { x = this.Width - 1; }
        if (y >= this.Height) { y = this.Height - 1; }
        return this.Map[x][y];
    },
    
    GetBlock: function(x, y) {
        if (x < 0) { x = 0; }
        if (y < 0) { return 0; }
        if (x >= this.Width) { x = this.Width - 1; }
        if (y >= this.Height) { y = this.Height - 1; }
        return this.Map[x][y];
    },
    
    SetBlock: function(x, y, block) {
        if (x < 0) { return; }
        if (y < 0) { return; }
        if (x >= this.Width) { return; }
        if (y >= this.Height) { return; }
        this.Map[x][y] = block;
    },
    
    SetBlockData: function(x, y, data) {
        if (x < 0) { return; }
        if (y < 0) { return; }
        if (x >= this.Width) { return; }
        if (y >= this.Height) { return; }
        this.Data[x][y] = data;
    },
    
    IsBlocking: function(x, y, xa, ya) {
        var block = this.GetBlock(x, y);
        var blocking = ((Mario.Tile.Behaviors[block]) & Mario.Tile.BlockAll) > 0;
        blocking |= (ya > 0) && ((Mario.Tile.Behaviors[block]) & Mario.Tile.BlockUpper) > 0;
        blocking |= (ya < 0) && ((Mario.Tile.Behaviors[block]) & Mario.Tile.BlockLower) > 0;

        return blocking;
    },
    
    GetSpriteTemplate: function(x, y) {
        if (x < 0) { return null; }
        if (y < 0) { return null; }
        if (x >= this.Width) { return null; }
        if (y >= this.Height) { return null; }
        return this.SpriteTemplates[x][y];
    },
    
    SetSpriteTemplate: function(x, y, template) {
        if (x < 0) { return; }
        if (y < 0) { return; }
        if (x >= this.Width) { return; }
        if (y >= this.Height) { return; }
        this.SpriteTemplates[x][y] = template;
    }
};