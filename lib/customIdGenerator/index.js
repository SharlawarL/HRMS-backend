var mongoose = require('mongoose'),
    extend = require('extend'),
    counterSchema,
    IdentityCounter;

exports.initialize = function (connection) {
    try {
        IdentityCounter = connection.model('IdentityCounter');
    } catch (ex) {
        if (ex.name === 'MissingSchemaError') {

            counterSchema = new mongoose.Schema({
                model: { type: String, require: true },
                field: { type: String, require: true },
                count: { type: Number, default: 0 }
            });

            counterSchema.index({ field: 1, model: 1 }, { unique: true, required: true, index: -1 });

            IdentityCounter = connection.model('IdentityCounter', counterSchema);
        }
        else
            throw ex;
    }
};

exports.plugin = function (schema, options) {
    if (!counterSchema || !IdentityCounter) throw new Error("mongoose-auto-increment has not been initialized");

    var settings = {
        model: null,
        field: '_id',
        startAt: 0,
        incrementBy: 1,
        unique: true
    },
        fields = {},
        ready = false;

    switch (typeof (options)) {
        case 'string':
            settings.model = options;
            break;
        case 'object':
            extend(settings, options);
            break;
    }

    if (settings.model == null)
        throw new Error("model must be set");

    fields[settings.field] = {
        type: String,
        require: true
    };
    if (settings.field !== '_id')
        fields[settings.field].unique = settings.unique
    schema.add(fields);
    IdentityCounter.findOne(
        { model: settings.model, field: settings.field },
        function (err, counter) {
            if (!counter) {
                counter = new IdentityCounter({ model: settings.model, field: settings.field, count: settings.startAt - settings.incrementBy });
                counter.save(function () {
                    ready = true;
                });
            }
            else {
                ready = true;
            }
        }
    );

    var nextCount = function (callback) {
        IdentityCounter.findOne({
            model: settings.model,
            field: settings.field
        }, function (err, counter) {
            if (err) return callback(err);
            callback(null, counter === null ? settings.startAt : counter.count + settings.incrementBy);
        });
    };
    schema.method('nextCount', nextCount);
    schema.static('nextCount', nextCount);

    var resetCount = function (callback) {
        IdentityCounter.findOneAndUpdate(
            { model: settings.model, field: settings.field },
            { count: settings.startAt - settings.incrementBy },
            { new: true }, 
            function (err) {
                if (err) return callback(err);
                callback(null, settings.startAt);
            }
        );
    };
    schema.method('resetCount', resetCount);
    schema.static('resetCount', resetCount);

    schema.pre('save', function (next) {
        var doc = this;

        if (doc.isNew) {
            (function save() {
                if (ready) {
                    if (typeof doc[settings.field] === 'number') {
                        IdentityCounter.findOneAndUpdate(

                            { model: settings.model, field: settings.field, count: { $lt: doc[settings.field] } },
                            { count: doc[settings.field] },
                            function (err) {
                                if (err) return next(err);
                                next();
                            }
                        );
                    } else {
                        IdentityCounter.findOneAndUpdate(
                            { model: settings.model, field: settings.field },
                            { $inc: { count: settings.incrementBy } },
                            { new: true },
                            function (err, updatedIdentityCounter) {
                                if (err) return next(err);
                                doc[settings.field] = `${options.constant}${updatedIdentityCounter.count}`;
                                next();
                            }
                        );
                    }
                }
                else
                    setTimeout(save, 5);
            })();
        }
        else
            next();
    });
};