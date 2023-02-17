"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class UsuarioDAO {
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT u.cveUsuario, u.nombre, u.apellidos, u.username, r.nombre as 'rol', r.cveRol "
                    + " FROM tbl_usuario u "
                    + " JOIN tbl_rol r ON u.cveRol = r.cveRol "
                    + " ORDER BY u.nombre ASC ");
            }));
            return result;
        });
    }
    agregar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tbl_usuario SET ? ", [usuario]);
            }));
            return result;
        });
    }
    actualizar(usuario, cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tbl_usuario SET ? WHERE cveUsuario  ", [usuario, cveUsuario]);
            }));
            return result;
        });
    }
    eliminar(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tbl_usuario WHERE cveUsuario = ?  ", [cveUsuario]);
            }));
            return result;
        });
    }
}
const dao = new UsuarioDAO();
exports.default = dao;
